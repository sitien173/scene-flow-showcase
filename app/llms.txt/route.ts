import { getDigest, getProjects, siteUrl } from "@/lib/projects";

export const dynamic = "force-static";

// Plain-text entry point for agents, following the llms.txt convention.
export function GET() {
  const projects = getProjects();
  const text = [
    "# scene-flow showcase",
    "> Video cộng đồng làm bằng scene-flow. Mỗi dự án có prompt, kịch bản, storyboard, feedback, bài học và mã nguồn.",
    "Đọc bản tổng hợp trước, rồi đến bài học từng dự án. Dữ liệu JSON đầy đủ: " +
      siteUrl("/lessons.json"),
    "## Bản tổng hợp bài học",
    getDigest()?.trim() ?? "Chưa có.",
    "## Bài học theo dự án",
    ...projects.map(
      (project) =>
        `### ${project.title}\n${project.theme} · ${project.format.replace("x", ":")} · ${siteUrl(`/p/${project.slug}/`)}\n\n${project.lessons.trim()}`,
    ),
  ].join("\n\n");
  return new Response(`${text}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
