import { z } from "zod";

export const createTemplateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Template name is required")
    .max(150, "Template name must have at most 150 characters"),

  description: z
    .string()
    .trim()
    .optional(),

  mediaType: z.enum([
    "IMAGE",
    "VIDEO",
    "PDF",
  ]),

  status: z
    .enum([
      "DRAFT",
      "PUBLISHED",
      "ARCHIVED",
    ])
    .default("DRAFT"),

  width: z
    .number()
    .positive("Template width must be greater than zero"),

  height: z
    .number()
    .positive("Template height must be greater than zero"),
});

export type CreateTemplateRequest =
  z.infer<typeof createTemplateSchema>;