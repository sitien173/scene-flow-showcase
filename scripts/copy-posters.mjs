// Copies each project's poster into public/ so the static export serves it.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";

const root = process.env.PROJECTS_DIR || "projects";
rmSync("public/p", { recursive: true, force: true });
for (const slug of readdirSync(root)) {
  const poster = `${root}/${slug}/poster.webp`;
  if (!existsSync(poster)) continue;
  mkdirSync(`public/p/${slug}`, { recursive: true });
  cpSync(poster, `public/p/${slug}/poster.webp`);
}
