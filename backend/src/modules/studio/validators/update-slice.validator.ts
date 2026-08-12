import { z } from "zod";

import { sliceBackgroundSchema } from "./create-slice.validator.js";

export const updateSliceSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Slice name cannot be empty")
      .max(150)
      .optional(),
    position: z
      .number()
      .int()
      .min(0, "Slice position cannot be negative")
      .optional(),
    duration: z
      .number()
      .positive("Slice duration must be greater than zero")
      .optional(),
    background: sliceBackgroundSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateSliceRequest = z.infer<typeof updateSliceSchema>;
