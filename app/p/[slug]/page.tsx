import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Markdown } from "@/components/markdown";
import {
  asset,
  findProject,
  formatDuration,
  getProjects,
  videoSrc,
} from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const projects = getProjects();
  // A static export needs at least one path; "_empty" renders the not-found page.
  return projects.length
    ? projects.map(({ slug }) => ({ slug }))
    : [{ slug: "_empty" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).slug);
  return project
    ? {
        title: project.title,
        description: `Video ${project.theme} của ${project.author.name}.`,
      }
    : { robots: { index: false } };
}

export default async function ProjectPage({ params }: Props) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  const sections: { id: string; label: string; body: ReactNode }[] = [
    {
      id: "prompt",
      label: "Prompt",
      body: <Markdown>{project.prompts}</Markdown>,
    },
    {
      id: "script",
      label: "Kịch bản",
      body: (
        <pre className="whitespace-pre-wrap font-sans leading-relaxed">
          {project.script}
        </pre>
      ),
    },
  ];
  if (project.storyboard)
    sections.push({
      id: "storyboard",
      label: "Storyboard",
      body: <Markdown>{project.storyboard}</Markdown>,
    });
  if (project.feedback)
    sections.push({
      id: "feedback",
      label: "Feedback",
      body: <Markdown>{project.feedback}</Markdown>,
    });
  if (project.sources.length)
    sections.push({
      id: "source",
      label: "Mã nguồn",
      body: project.sources.map((file) => (
        <details key={file.path} className="border-b border-line py-2">
          <summary className="cursor-pointer font-mono text-sm">
            {file.path}
          </summary>
          <pre className="mt-2 max-h-[32rem] overflow-auto rounded-lg bg-surface p-4 text-xs">
            <code>{file.text}</code>
          </pre>
        </details>
      )),
    });

  const portrait = project.format === "9x16";
  return (
    <div
      className={
        portrait
          ? "grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]"
          : "grid gap-8"
      }
    >
      <div
        className={portrait ? "lg:sticky lg:top-8 lg:self-start" : undefined}
      >
        {/* biome-ignore lint/a11y/useMediaCaption: captions are burned into the video */}
        <video
          controls
          playsInline
          preload="metadata"
          poster={asset(`/p/${project.slug}/poster.webp`)}
          src={videoSrc(project)}
          className={`w-full rounded-xl bg-black ${portrait ? "mx-auto aspect-[9/16] max-w-sm" : "aspect-video"}`}
        />
      </div>
      <article className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-2 text-sm text-dim">
          {project.author.url ? (
            <a
              href={project.author.url}
              className="text-ink underline underline-offset-2"
            >
              {project.author.name}
            </a>
          ) : (
            project.author.name
          )}{" "}
          · {project.theme} · {project.format.replace("x", ":")} ·{" "}
          {formatDuration(project.durationSec)} · {project.publishedAt}
        </p>
        <nav className="sticky top-0 z-10 -mx-1 mt-6 flex gap-1 overflow-x-auto border-b border-line bg-bg/90 py-2 backdrop-blur">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 rounded-md px-3 py-1.5 text-sm text-dim hover:bg-surface hover:text-ink"
            >
              {section.label}
            </a>
          ))}
        </nav>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-16 border-b border-line py-8"
          >
            <h2 className="mb-4 text-lg font-semibold">{section.label}</h2>
            {section.body}
          </section>
        ))}
      </article>
    </div>
  );
}
