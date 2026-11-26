#!/usr/bin/env python3
"""Package a finished scene-flow project for the showcase and submit it as a pull request.

Run it from a clone of your fork of the showcase repository:

  python3 tools/share.py prompts <project>      print your prompts from Claude Code transcripts
  python3 tools/share.py pack <project> --slug S --title T --author A [--author-url U]
                         [--video F] [--poster-at 1.0] [--prompts FILE] [--lessons FILE]
                         [--lang vi] [--force]
  python3 tools/share.py submit <slug> [--yes]  create the video release on your fork and open the PR

pack writes only allowlisted text files, a poster, and project.json into projects/<slug>/, and the
compressed video into the temp folder. submit is the only command that sends anything to GitHub.
"""
import argparse
import datetime
import glob
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORK = os.path.join(tempfile.gettempdir(), "scene-flow-share")
SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
# Keep in sync with ALLOWED in lib/projects.ts, which adds the source/ prefix.
SOURCE = re.compile(r"^(?:(?:look|meta|cues)\.json|parts/[A-Za-z0-9_./-]+\.(?:part|js|css|txt|html|json)"
                    r"|vignettes/[A-Za-z0-9_./-]+\.(?:js|json))$")
MAX_TEXT = 600 * 1024
MAX_POSTER = 300 * 1024
MAX_VIDEO = 200 * 1024 * 1024
TODO = "<!-- TODO"
SECRETS = {
    "OpenAI or Anthropic key": r"\bsk-[A-Za-z0-9_-]{20,}",
    "AWS key": r"\bAKIA[0-9A-Z]{16}\b",
    "GitHub token": r"\bgh[pousr]_[A-Za-z0-9]{30,}",
    "Slack token": r"\bxox[abprs]-[A-Za-z0-9-]{10,}",
    "Google API key": r"\bAIza[0-9A-Za-z_-]{35}\b",
    "private key": r"-----BEGIN [A-Z ]*PRIVATE KEY-----",
    "assigned secret": r"(?i)\b[A-Z0-9_]*(?:API_KEY|TOKEN|SECRET|PASSWORD)\s*[=:]\s*['\"]?[A-Za-z0-9_\-./+]{16,}",
}
WARNINGS = {
    "email address": r"\b[\w.+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}\b",
    "home folder path": r"(?:/home/|/Users/|C:\\Users\\)[^/\\\s]+",
}
PROMPTS_TEMPLATE = """<!-- TODO: replace this template with a summary of your prompts, then delete this line. -->
# Prompt đã dùng

## Ý tưởng ban đầu

## Các bước chính và prompt tiêu biểu

## Những lần sửa quan trọng
"""
LESSONS_TEMPLATE = """<!-- TODO: replace this template with your lessons, then delete this line. -->
# Bài học

## Hiệu quả

## Tránh

## Gợi ý cho agent lần sau
"""


def die(msg):
    sys.exit("share: " + msg)


def run(*cmd, cwd=REPO):
    r = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True)
    if r.returncode:
        die("%s failed:\n%s" % (" ".join(cmd[:3]), (r.stderr or r.stdout).strip()))
    return r.stdout.strip()


def fork():
    url = run("git", "remote", "get-url", "origin")
    m = re.search(r"github\.com[:/]([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+?)(?:\.git)?$", url)
    if not m:
        die("origin is not a GitHub repository: " + url)
    return m.group(1), m.group(2)


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def transcripts(project):
    """Claude Code sessions started in the project folder, or in a folder above it that name the project."""
    name, folder, found = os.path.basename(project), project, []
    while True:
        key = re.sub(r"[^A-Za-z0-9]", "-", folder)
        for path in glob.glob(os.path.expanduser("~/.claude/projects/%s/*.jsonl" % key)):
            if folder == project or name in open(path, encoding="utf-8", errors="replace").read():
                found.append(path)
        parent = os.path.dirname(folder)
        if parent in (folder, os.path.expanduser("~")):
            return sorted(found, key=os.path.getmtime)
        folder = parent


def cmd_prompts(a):
    files = transcripts(os.path.abspath(a.project))
    if not files:
        die("no Claude Code transcripts for this folder; write PROMPTS.md from memory")
    for path in files:
        print("# session %s\n" % os.path.basename(path)[:8])
        for line in open(path, encoding="utf-8"):
            try:
                e = json.loads(line)
            except ValueError:
                continue
            if e.get("type") != "user" or e.get("isMeta") or e.get("isSidechain"):
                continue
            c = (e.get("message") or {}).get("content")
            texts = [c] if isinstance(c, str) else [b.get("text", "") for b in c or []
                                                    if isinstance(b, dict) and b.get("type") == "text"]
            for t in texts:
                t = t.strip()
                cmd = re.search(r"<command-name>(.*?)</command-name>.*?<command-args>(.*?)</command-args>", t, re.S)
                if cmd:
                    t = (cmd.group(1) + " " + cmd.group(2)).strip()
                elif not t or t.startswith("<"):
                    continue
                print("## %s\n\n%s\n" % (e.get("timestamp", "")[:16], t))


def feedback(project):
    path = os.path.join(project, "CLAUDE.md")
    if not os.path.exists(path):
        return ""
    m = re.search(r"^## Feedback for this video\n(.*?)(?=^#{1,2} |\Z)", open(path, encoding="utf-8").read(), re.M | re.S)
    body = m.group(1).strip() if m else ""
    return re.sub(r"^Rules here apply to this video only.*?(?:\n\n|\Z)", "", body, flags=re.S).strip()


def probe(video):
    out = json.loads(run("ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                         "stream=width,height:format=duration", "-of", "json", video))
    s = out["streams"][0]
    return s["width"], s["height"], float(out["format"]["duration"])


def scan(stage):
    problems, warnings = [], []
    for root, _, names in os.walk(stage):
        for name in names:
            path = os.path.join(root, name)
            rel = os.path.relpath(path, stage)
            size = os.path.getsize(path)
            if size > (MAX_POSTER if name == "poster.webp" else MAX_TEXT):
                problems.append("%s: %d bytes is over the limit" % (rel, size))
            if name == "poster.webp":
                continue
            for n, line in enumerate(open(path, encoding="utf-8", errors="replace"), 1):
                problems += ["%s:%d: looks like a %s" % (rel, n, k) for k, p in SECRETS.items() if re.search(p, line)]
                warnings += ["%s:%d: %s" % (rel, n, k) for k, p in WARNINGS.items() if re.search(p, line)]
    return problems, warnings


def cmd_pack(a):
    src = os.path.abspath(a.project)
    if not os.path.isfile(os.path.join(src, "SCRIPT.md")):
        die("%s has no SCRIPT.md; is it a scene-flow project?" % src)
    if not SLUG.match(a.slug):
        die("slug must be lowercase letters and digits joined by single hyphens")
    dest = os.path.join(REPO, "projects", a.slug)
    if os.path.exists(dest) and not a.force:
        die("projects/%s exists; pass --force to replace it" % a.slug)
    renders = sorted(glob.glob(os.path.join(src, "renders", "*.mp4")), key=os.path.getmtime)
    video = a.video or (renders[-1] if renders else die("no renders/*.mp4; render first or pass --video"))
    w, h, duration = probe(video)
    portrait = h > w
    owner, repo = fork()

    work = os.path.join(WORK, a.slug)
    stage = os.path.join(work, "stage")
    shutil.rmtree(work, ignore_errors=True)
    os.makedirs(stage)
    mp4 = os.path.join(work, a.slug + ".mp4")
    print("encoding %s" % os.path.relpath(video, src), file=sys.stderr)
    run("ffmpeg", "-nostdin", "-v", "error", "-y", "-i", video, "-map", "0:v:0", "-map", "0:a:0?",
        "-vf", ("scale=720:-2" if portrait else "scale=1280:-2") + ",setsar=1", "-c:v", "libx264",
        "-preset", "medium", "-crf", "23", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k",
        "-movflags", "+faststart", mp4)
    if os.path.getsize(mp4) > MAX_VIDEO:
        die("the encoded video is over 200 MiB")
    run("ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", str(a.poster_at), "-i", video, "-frames:v", "1",
        "-vf", "scale=540:-2" if portrait else "scale=960:-2", "-c:v", "libwebp", "-q:v", "75",
        os.path.join(stage, "poster.webp"))

    shutil.copy(os.path.join(src, "SCRIPT.md"), stage)
    if os.path.isfile(os.path.join(src, "STORYBOARD.md")):
        shutil.copy(os.path.join(src, "STORYBOARD.md"), stage)
    notes = feedback(src)
    if notes:
        open(os.path.join(stage, "FEEDBACK.md"), "w", encoding="utf-8").write(notes + "\n")
    if a.prompts:
        shutil.copy(a.prompts, os.path.join(stage, "PROMPTS.md"))
    else:
        open(os.path.join(stage, "PROMPTS.md"), "w", encoding="utf-8").write(PROMPTS_TEMPLATE)
    if a.lessons:
        shutil.copy(a.lessons, os.path.join(stage, "LESSONS.md"))
    else:
        open(os.path.join(stage, "LESSONS.md"), "w", encoding="utf-8").write(LESSONS_TEMPLATE)
    for root, dirs, names in os.walk(src):
        dirs[:] = [d for d in dirs if not d.startswith(".") and d != "node_modules"]
        for name in names:
            path = os.path.join(root, name)
            rel = os.path.relpath(path, src).replace(os.sep, "/")
            if SOURCE.match(rel) and not os.path.islink(path):
                os.makedirs(os.path.dirname(os.path.join(stage, "source", rel)), exist_ok=True)
                shutil.copy(path, os.path.join(stage, "source", rel))

    meta_path = os.path.join(src, "meta.json")
    meta = json.load(open(meta_path, encoding="utf-8")) if os.path.isfile(meta_path) else {}
    digest = sha256(mp4)
    tag = "video-%s-%s" % (a.slug, digest[:8])
    project = {
        "title": a.title,
        "author": {"name": a.author, **({"url": a.author_url} if a.author_url else {})},
        "theme": meta.get("theme", "neon3d"),
        "format": "9x16" if portrait else "16x9",
        "lang": a.lang,
        "durationSec": round(duration, 1),
        "publishedAt": datetime.date.today().isoformat(),
        "video": {
            "url": "https://github.com/%s/%s/releases/download/%s/%s.mp4" % (owner, repo, tag, a.slug),
            "sha256": digest,
            "bytes": os.path.getsize(mp4),
        },
    }
    with open(os.path.join(stage, "project.json"), "w", encoding="utf-8") as f:
        json.dump(project, f, ensure_ascii=False, indent=2)
        f.write("\n")

    problems, warnings = scan(stage)
    if problems:
        die("nothing was written to projects/; fix these in the project and pack again:\n  " + "\n  ".join(problems))
    shutil.rmtree(dest, ignore_errors=True)
    shutil.move(stage, dest)

    print("wrote projects/%s:" % a.slug)
    for root, _, names in sorted(os.walk(dest)):
        for name in sorted(names):
            path = os.path.join(root, name)
            print("  %7d  %s" % (os.path.getsize(path), os.path.relpath(path, dest)))
    print("video: %s (%d bytes, not in git)" % (mp4, os.path.getsize(mp4)))
    for warning in warnings:
        print("check: " + warning)
    todo = [n for n, given in (("PROMPTS.md", a.prompts), ("LESSONS.md", a.lessons)) if not given]
    if todo:
        print("next: write %s in projects/%s/, then run: python3 tools/share.py submit %s"
              % (" and ".join(todo), a.slug, a.slug))


def cmd_submit(a):
    dest = os.path.join(REPO, "projects", a.slug)
    mp4 = os.path.join(WORK, a.slug, a.slug + ".mp4")
    project = json.load(open(os.path.join(dest, "project.json"), encoding="utf-8"))
    for name in ("PROMPTS.md", "LESSONS.md"):
        if TODO in open(os.path.join(dest, name), encoding="utf-8").read():
            die("%s still has the TODO template" % name)
    if not os.path.isfile(mp4) or sha256(mp4) != project["video"]["sha256"]:
        die("%s is missing or differs from project.json; run pack again" % mp4)
    problems, _ = scan(dest)
    if problems:
        die("\n  ".join(problems))
    owner, repo = fork()
    parent = run("gh", "repo", "view", "%s/%s" % (owner, repo), "--json", "parent",
                 "--jq", '.parent.owner.login + "/" + .parent.name')
    if parent == "/":
        die("origin %s/%s is not a fork; run: gh repo fork <owner>/<repo> --clone" % (owner, repo))
    m = re.match(r"^https://github\.com/([^/]+)/([^/]+)/releases/download/([^/]+)/", project["video"]["url"])
    if not m or (m.group(1), m.group(2)) != (owner, repo):
        die("video.url does not point at %s/%s; run pack again" % (owner, repo))
    tag, branch = m.group(3), "share/" + a.slug

    print("This will:\n  1. create release %s on %s/%s with %s\n  2. push branch %s to %s/%s\n  3. open a pull request on %s"
          % (tag, owner, repo, os.path.basename(mp4), branch, owner, repo, parent))
    if not a.yes and input("Continue? [y/N] ").strip().lower() != "y":
        die("cancelled")
    exists = subprocess.run(["gh", "release", "view", tag, "--repo", "%s/%s" % (owner, repo)],
                            cwd=REPO, capture_output=True).returncode == 0
    if not exists:
        run("gh", "release", "create", tag, mp4, "--repo", "%s/%s" % (owner, repo),
            "--title", "Video: " + project["title"], "--notes", "scene-flow showcase submission")
    run("git", "checkout", "-B", branch)
    run("git", "add", "--", "projects/" + a.slug)
    run("git", "commit", "-m", "feat: add " + a.slug)
    run("git", "push", "-u", "origin", branch)
    print(run("gh", "pr", "create", "--repo", parent, "--head", "%s:%s" % (owner, branch),
              "--title", "Thêm video: " + project["title"],
              "--body", "Dự án %s gửi bằng tools/share.py." % a.slug))


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("prompts")
    s.add_argument("project")
    s = sub.add_parser("pack")
    s.add_argument("project")
    s.add_argument("--slug", required=True)
    s.add_argument("--title", required=True)
    s.add_argument("--author", required=True)
    s.add_argument("--author-url")
    s.add_argument("--video", help="render to share; default: newest renders/*.mp4")
    s.add_argument("--poster-at", type=float, default=1.0, help="poster time in seconds")
    s.add_argument("--prompts", help="finished PROMPTS.md to include")
    s.add_argument("--lessons", help="finished LESSONS.md to include")
    s.add_argument("--lang", default="vi")
    s.add_argument("--force", action="store_true")
    s = sub.add_parser("submit")
    s.add_argument("slug")
    s.add_argument("--yes", action="store_true", help="skip the confirmation")
    a = p.parse_args()
    {"prompts": cmd_prompts, "pack": cmd_pack, "submit": cmd_submit}[a.cmd](a)


if __name__ == "__main__":
    main()
