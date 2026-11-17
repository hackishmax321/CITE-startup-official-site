
import { getDb } from "@/lib/mongodb";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const db = await getDb();

  const projects = await db
    .collection("projects")
    .find(
      { status: "published" },
      { projection: { slug: 1, updatedAt: 1, _id: 0 } }
    )
    .toArray();

  const staticPages = [
    "",
    "/about",
    "/services",
    "/projects",
    "/contact",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt || new Date(),
  }));

  return [...staticUrls, ...projectUrls];
}
