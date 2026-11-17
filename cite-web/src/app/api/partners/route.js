
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDb();

    const partners = await db
      .collection("partners")
      .find(
        { status: "active" },
        {
          projection: {
            name: 1,
            slug: 1,
            description: 1,
            logo: 1,
            website: 1,
            _id: 0,
          },
        }
      )
      .sort({ name: 1 })
      .limit(100)
      .toArray();

    return Response.json({
      success: true,
      data: partners,
    });

  } catch (error) {
    console.error("Partners API error:", error);

    return Response.json(
      { success: false, message: "Unable to load partners." },
      { status: 500 }
    );
  }
}
