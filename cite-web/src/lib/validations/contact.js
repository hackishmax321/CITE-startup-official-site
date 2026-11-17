
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),

  email: z.string().trim().email().max(150),

  phone: z.string().trim().max(30).optional().default(""),

  subject: z.string().trim().min(3).max(120),

  message: z.string().trim().min(10).max(3000),

  // remain empty for real visitors
  website: z.string().max(0).optional().default(""),
});
