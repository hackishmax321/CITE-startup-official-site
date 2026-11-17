
import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(3).max(120),

  shortDescription: z.string().trim().min(10).max(250),

  description: z.string().trim().min(10).max(10000),

  category: z.string().trim().min(2).max(80),

  technologies: z.array(
    z.string().trim().min(1).max(40)
  ).max(20),

  thumbnail: z.string().trim().max(500),

  projectUrl: z.string().trim().max(500).optional().default(""),

  featured: z.boolean().default(false),

  status: z.enum(["draft", "published"]).default("draft"),

  seo: z.object({
    title: z.string().trim().max(70).optional().default(""),
    description: z.string().trim().max(170).optional().default(""),
  }).optional(),
});
