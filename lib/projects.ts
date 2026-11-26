import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { z } from "zod";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Keep in sync with SOURCE in tools/share.py.
const ALLOWED =
  /^(?:project\.json|SCRIPT\.md|STORYBOARD\.md|FEEDBACK\.md|PROMPTS\.md|poster\.webp|source\/(?:look|meta|cues)\.json|source\/parts\/[A-Za-z0-9_./-]+\.(?:part|js|css|txt|html|json)|source\/vignettes\/[A-Za-z0-9_./-]+\.(?:js|json))$/;
const REQUIRED = ["project.json", "SCRIPT.md", "PROMPTS.md", "poster.webp"];
const MAX_TEXT = 600 * 1024;
const MAX_POSTER = 300 * 1024;
const TODO = "<!-- TODO";

const projectSchema = z.strictObject({
  title: z.string().trim().min(1).max(120),
  author: z.strictObject({
    name: z.string().trim().min(1).max(80),
    url: z
      .string()
      .regex(/^https:\/\/\S+$/)
      .optional(),
  }),
  theme: z.string().regex(SLUG),
  format: z.enum(["9x16", "16x9"]),
  lang: z.string().regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/),
  durationSec: z.number().positive().max(3600),
  publishedAt: z.iso.date(),
  video: z.strictObject({
    url: z
      .string()
      .regex(
        /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/releases\/download\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\.mp4$/,
      ),
    sha256: z.string().regex(/^[0-9a-f]{64}$/),
    bytes: z
      .number()
      .int()
      .positive()
      .max(200 * 1024 * 1024),
  }),
});

export type SourceFile = { path: string; text: string };
export type Project = z.infer<typeof projectSchema> & {
  slug: string;
  script: string;
  prompts: string;
  storyboard?: string;
  feedback?: string;
  sources: SourceFile[];
};

function loadProject(root: string, slug: string): Project {
  const dir = join(root, slug);
  const fail = (message: string): never => {
    throw new Error(`projects/${slug}: ${message}`);
  };
  if (!SLUG.test(slug))
    fail(
      "folder name must be lowercase letters and digits joined by single hyphens",
    );

  const files: string[] = [];
  for (const entry of readdirSync(dir, {
    recursive: true,
    withFileTypes: true,
  })) {
    if (entry.isDirectory()) continue;
    const path = relative(dir, join(entry.parentPath, entry.name))
      .split(sep)
      .join("/");
    if (!entry.isFile()) fail(`${path}: only regular files are allowed`);
    if (!ALLOWED.test(path)) fail(`${path}: file is not allowed`);
    const size = statSync(join(dir, path)).size;
    if (size > (path === "poster.webp" ? MAX_POSTER : MAX_TEXT))
      fail(`${path}: ${size} bytes is over the limit`);
    files.push(path);
  }
  for (const name of REQUIRED)
    if (!files.includes(name)) fail(`${name} is missing`);

  const read = (path: string) => readFileSync(join(dir, path), "utf8");
  const optional = (path: string) =>
    files.includes(path) ? read(path) : undefined;
  const parsed = projectSchema.safeParse(JSON.parse(read("project.json")));
  if (!parsed.success) fail(`project.json\n${z.prettifyError(parsed.error)}`);
  const prompts = read("PROMPTS.md");
  if (prompts.includes(TODO)) fail("PROMPTS.md still has the TODO template");

  return {
    ...(parsed.data as z.infer<typeof projectSchema>),
    slug,
    script: read("SCRIPT.md"),
    prompts,
    storyboard: optional("STORYBOARD.md"),
    feedback: optional("FEEDBACK.md"),
    sources: files
      .filter((path) => path.startsWith("source/"))
      .sort()
      .map((path) => ({
        path: path.slice("source/".length),
        text: read(path),
      })),
  };
}

export function loadProjects(root: string): Project[] {
  const slugs = readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name);
  return slugs
    .map((slug) => loadProject(root, slug))
    .sort(
      (a, b) =>
        b.publishedAt.localeCompare(a.publishedAt) ||
        a.slug.localeCompare(b.slug),
    );
}

let cache: Project[] | undefined;

export function getProjects(): Project[] {
  cache ??= loadProjects(process.env.PROJECTS_DIR || "projects");
  return cache;
}

export function findProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

// Same key as the media job in .github/workflows/deploy.yml.
export function videoSrc(project: Project): string {
  const host = process.env.MEDIA_HOST;
  return host
    ? `https://${host}/${project.slug}/${project.video.sha256.slice(0, 16)}.mp4`
    : project.video.url;
}

export function asset(path: string): string {
  return `${process.env.BASE_PATH || ""}${path}`;
}

export function formatDuration(seconds: number): string {
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
