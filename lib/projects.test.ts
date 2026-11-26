import {
  cpSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { loadProjects } from "./projects";

const FIXTURE = "tests/fixtures/projects";
let root: string;

function copyFixture() {
  root = mkdtempSync(join(tmpdir(), "showcase-"));
  cpSync(FIXTURE, root, { recursive: true });
  return join(root, "demo-video");
}

afterEach(() => root && rmSync(root, { recursive: true, force: true }));

describe("loadProjects", () => {
  it("loads the fixture with its sections and source files", () => {
    const [project] = loadProjects(FIXTURE);
    expect(project.slug).toBe("demo-video");
    expect(project.format).toBe("9x16");
    expect(project.storyboard).toContain("Cảnh 1");
    expect(project.sources.map((s) => s.path)).toEqual([
      "look.json",
      "parts/timeline.js",
    ]);
  });

  it("rejects a file outside the allowlist", () => {
    const dir = copyFixture();
    writeFileSync(join(dir, ".env"), "KEY=1");
    expect(() => loadProjects(root)).toThrow(
      "projects/demo-video: .env: file is not allowed",
    );
  });

  it("rejects a video URL that is not a GitHub release asset", () => {
    const dir = copyFixture();
    const json = JSON.parse(readFileSync(join(dir, "project.json"), "utf8"));
    json.video.url = "https://example.com/v.mp4";
    writeFileSync(join(dir, "project.json"), JSON.stringify(json));
    expect(() => loadProjects(root)).toThrow("video.url");
  });

  it("rejects the PROMPTS.md template", () => {
    const dir = copyFixture();
    writeFileSync(join(dir, "PROMPTS.md"), "<!-- TODO: write -->\n");
    expect(() => loadProjects(root)).toThrow(
      "PROMPTS.md still has the TODO template",
    );
  });

  it("rejects a missing required file", () => {
    const dir = copyFixture();
    rmSync(join(dir, "poster.webp"));
    expect(() => loadProjects(root)).toThrow("poster.webp is missing");
  });
});
