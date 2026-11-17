
import { getDb } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/admin";
import { createUniqueSlug } from "@/lib/slug";
import { projectSchema } from "@/lib/validations/project";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const validation = projectSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          success: false,
          message: "Invalid project information.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;
    const db = await getDb();

    const slug = await createUniqueSlug("projects", data.title);

    const project = {
      ...data,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: session.user.id,
    };

    const result = await db.collection("projects").insertOne(project);

    return Response.json(
      {
        success: true,
        message: "Project created successfully.",
        data: {
          id: result.insertedId.toString(),
          slug,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Project creation error:", error);

    return Response.json(
      { success: false, message: "Unable to create project." },
      { status: 500 }
    );
  }
}
