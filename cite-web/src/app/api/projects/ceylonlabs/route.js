
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const db = await getDb();

    const project = await db.collection("projects").findOne(
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
          gallery: 1,
          projectUrl: 1,
          seo: 1,
          createdAt: 1,
          _id: 0,
        },
      }
    );

    if (!project) {
      return Response.json(
        { success: false, message: "Project not found." },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: project,
    });

  } catch (error) {
    console.error("Project API error:", error);

    return Response.json(
      { success: false, message: "Unable to load project." },
      { status: 500 }
    );
  }
}
