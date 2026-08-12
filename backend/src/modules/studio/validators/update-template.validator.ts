import { z } from "zod";

export const updateTemplateSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Template name cannot be empty")
      .max(150, "Template name must have at most 150 characters")
      .optional(),

    description: z
      .string()
      .trim()
      .nullable()
      .optional(),

    mediaType: z
      .enum([
        "IMAGE",
        "VIDEO",
        "PDF",
      ])
      .optional(),

    status: z
      .enum([
        "DRAFT",
        "PUBLISHED",
        "ARCHIVED",
      ])
      .optional(),

    width: z
      .number()
      .positive("Template width must be greater than zero")
      .optional(),

    height: z
      .number()
      .positive("Template height must be greater than zero")
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided",
    },
  );

export type UpdateTemplateRequest =
  z.infer<typeof updateTemplateSchema>;