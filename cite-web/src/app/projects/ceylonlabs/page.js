
import { getDb } from "@/lib/mongodb";
import { notFound } from "next/navigation";

async function getProject(slug) {
  const db = await getDb();

  return db.collection("projects").findOne(
    {
      slug,
      status: "published",
    },
    {
      projection: {
        title: 1,
        slug: 1,
        shortDescription: 1,
        description: 1,
        category: 1,
        technologies: 1,
        thumbnail: 1,
        projectUrl: 1,
        seo: 1,
        _id: 0,
      },
    }
  );
}

// Dynamic SEO metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | SmartDev",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    title: project.seo?.title ||
      `${project.title} | SmartDev`,

    description: project.seo?.description ||
      project.shortDescription,

    alternates: {
      canonical: `${baseUrl}/projects/${project.slug}`,
    },

    openGraph: {
      title: project.seo?.title || project.title,
      description:
        project.seo?.description || project.shortDescription,
      url: `${baseUrl}/projects/${project.slug}`,
      images: project.thumbnail
        ? [project.thumbnail]
        : [],
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="section-container py-20">

      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        {project.category}
      </p>

      <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-6xl">
        {project.title}
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
        {project.shortDescription}
      </p>

      {project.thumbnail && (
        <img
          src={project.thumbnail}
          alt={project.title}
          className="mt-12 w-full rounded-2xl border border-border object-cover"
        />
      )}

      <div className="mt-12 max-w-4xl">
        <h2 className="text-2xl font-bold">
          Project Overview
        </h2>

        <p className="mt-5 whitespace-pre-line leading-8 text-muted">
          {project.description}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {project.technologies?.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm text-muted"
          >
            {technology}
          </span>
        ))}
      </div>

      {project.projectUrl && (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-10"
        >
          Visit Project →
        </a>
      )}

    </main>
  );
}
