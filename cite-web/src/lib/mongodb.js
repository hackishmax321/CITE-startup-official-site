
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "cite_db";

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export async function getMongoClient() {
  return clientPromise;
}
