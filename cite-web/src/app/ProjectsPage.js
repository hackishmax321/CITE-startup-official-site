import { getDb } from "@/lib/mongodb";
import Link from "next/link";

export default async function ProjectsPage() {
  const db = await getDb();

  const projects = await db
    .collection("projects")
    .find({ status: "published" })
    .sort({ featured: -1, createdAt: -1 })
    .limit(50)
    .toArray();

  return (
    <main className="section-container py-20">
      <h1 className="text-4xl font-bold">
        Our Projects
      </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project._id.toString()}
            href={`/projects/${project.slug}`}
            className="theme-card p-6 transition hover:border-primary"
          >
            <h2 className="text-xl font-bold">
              {project.title}
            </h2>

            <p className="mt-3 text-muted">
              {project.shortDescription}
            </p>

            <span className="mt-5 inline-block text-primary">
              View Project →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}