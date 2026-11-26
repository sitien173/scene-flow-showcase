import { ProjectGrid } from "@/components/project-grid";
import { asset, formatDuration, getProjects } from "@/lib/projects";

export default function Home() {
  const cards = getProjects().map((project) => ({
    slug: project.slug,
    title: project.title,
    author: project.author.name,
    theme: project.theme,
    format: project.format,
    duration: formatDuration(project.durationSec),
    poster: asset(`/p/${project.slug}/poster.webp`),
  }));

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Video làm bằng scene-flow
      </h1>
      <p className="mt-2 mb-8 max-w-2xl text-dim">
        Xem video, rồi đọc prompt, kịch bản, storyboard và mã nguồn mà tác giả
        đã dùng.
      </p>
      {cards.length ? (
        <ProjectGrid cards={cards} />
      ) : (
        <p className="text-dim">Chưa có dự án nào.</p>
      )}
    </>
  );
}
