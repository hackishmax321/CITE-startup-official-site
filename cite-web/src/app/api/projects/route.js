
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDb();

    const projects = await db
      .collection("projects")
      .find(
        { status: "published" },
        {
          projection: {
            title: 1,
            slug: 1,
            shortDescription: 1,
            category: 1,
            technologies: 1,
            thumbnail: 1,
            featured: 1,
            createdAt: 1,
            _id: 0,
          },
        }
      )
      .sort({ featured: -1, createdAt: -1 })
      .limit(50)
      .toArray();

    return Response.json({
      success: true,
      data: projects,
    });

  } catch (error) {
    console.error("Projects API error:", error);

    return Response.json(
      { success: false, message: "Unable to load projects." },
      { status: 500 }
    );
  }
}
