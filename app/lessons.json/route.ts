import { getDigest, getProjects, siteUrl } from "@/lib/projects";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    digest: getDigest() ?? null,
    projects: getProjects().map((project) => ({
      slug: project.slug,
      title: project.title,
      theme: project.theme,
      format: project.format,
      publishedAt: project.publishedAt,
      url: siteUrl(`/p/${project.slug}/`),
      lessons: project.lessons,
    })),
  });
}
