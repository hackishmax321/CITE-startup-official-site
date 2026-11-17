
import { getDb } from "@/lib/mongodb";
import { contactSchema } from "@/lib/validations/contact";

// export const runtime = "nodejs";

export async function POST(request) {
  try {
    // Check request origin
    const origin = request.headers.get("origin");
    const expectedOrigin = process.env.NEXT_PUBLIC_SITE_URL;

    if (!origin || origin !== expectedOrigin) {
      return Response.json(
        { success: false, message: "Invalid request origin" },
        { status: 403 }
      );
    }

    // Reject excessively large requests
    const contentLength = Number(
      request.headers.get("content-length") || 0
    );

    if (contentLength > 12000) {
      return Response.json(
        { success: false, message: "Request too large" },
        { status: 413 }
      );
    }

    const body = await request.json();

    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          success: false,
          message: "Please check the submitted information.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Honeypot: silently accept but do not store obvious bot submissions
    if (data.website) {
      return Response.json({
        success: true,
        message: "Your enquiry has been received.",
      });
    }

    const db = await getDb();

    const result = await db.collection("contacts").insertOne({
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Response.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
        id: result.insertedId.toString(),
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to submit your enquiry right now.",
      },
      { status: 500 }
    );
  }
}
