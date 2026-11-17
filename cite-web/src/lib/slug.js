
import { getDb } from "@/lib/mongodb";

export function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createUniqueSlug(collectionName, title) {
  const db = await getDb();
  const collection = db.collection(collectionName);

  const baseSlug = slugify(title);

  if (!baseSlug) {
    throw new Error("Cannot generate a slug from this title");
  }

  let slug = baseSlug;
  let counter = 2;

  while (await collection.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
