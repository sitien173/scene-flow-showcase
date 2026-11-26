import type { Metadata } from "next";
import Link from "next/link";
import { ExportButtons } from "@/components/export-buttons";
import { Markdown } from "@/components/markdown";
import { asset, getDigest, getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Bài học",
  description:
    "Bài học rút ra từ các video scene-flow, kèm bản tổng hợp cho agent.",
};

export default function LessonsPage() {
  const digest = getDigest();
  const projects = getProjects();

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Bài học
      </h1>
      <p className="mt-2 max-w-2xl text-dim">
        Tác giả ghi lại điều hiệu quả, điều nên tránh và gợi ý cho lần sau.
        Agent đọc bản máy tại{" "}
        <a href={asset("/lessons.json")} className="text-accent underline">
          lessons.json
        </a>{" "}
        hoặc{" "}
        <a href={asset("/llms.txt")} className="text-accent underline">
          llms.txt
        </a>
        .
      </p>

      <section className="border-b border-line py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Bản tổng hợp</h2>
          {digest && <ExportButtons filename="DIGEST.md" text={digest} />}
        </div>
        {digest ? (
          <Markdown>{digest}</Markdown>
        ) : (
          <p className="text-dim">
            Chưa có bản tổng hợp. Workflow lessons tạo bản này sau khi có bài
            học mới được merge.
          </p>
        )}
      </section>

      <section className="py-8">
        <h2 className="mb-4 text-lg font-semibold">Theo dự án</h2>
        {projects.length ? (
          projects.map((project) => (
            <details key={project.slug} className="border-b border-line py-3">
              <summary className="cursor-pointer">
                <span className="font-semibold">{project.title}</span>{" "}
                <span className="text-sm text-dim">
                  · {project.theme} · {project.format.replace("x", ":")}
                </span>
              </summary>
              <div className="mt-4">
                <Markdown>{project.lessons}</Markdown>
                <Link
                  href={`/p/${project.slug}/`}
                  className="mt-4 inline-block text-sm text-accent underline"
                >
                  Xem video
                </Link>
              </div>
            </details>
          ))
        ) : (
          <p className="text-dim">Chưa có dự án nào.</p>
        )}
      </section>
    </>
  );
}
