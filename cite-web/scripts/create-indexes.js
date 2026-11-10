
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

async function createIndexes() {
  try {
    await client.connect();

    const db = client.db(process.env.MONGODB_DB || "cite_db");

    await db.collection("projects").createIndex(
      { slug: 1 },
      { unique: true }
    );

    await db.collection("projects").createIndex({
      status: 1,
      featured: 1,
    });

    await db.collection("partners").createIndex(
      { slug: 1 },
      { unique: true }
    );

    await db.collection("partners").createIndex({
      status: 1,
    });

    await db.collection("contacts").createIndex({
      createdAt: -1,
    });

    await db.collection("contacts").createIndex({
      status: 1,
    });

    console.log("CITE database indexes created successfully.");
  } catch (error) {
    console.error("Index creation failed:", error);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

createIndexes();
