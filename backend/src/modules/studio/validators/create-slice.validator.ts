import { z } from "zod";

export const createSliceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Slice name is required")
    .max(150),

  position: z
    .number()
    .int()
    .min(0, "Slice position cannot be negative"),

  duration: z
    .number()
    .positive(
      "Slice duration must be greater than zero",
    ),

  background: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("COLOR"),
      value: z.string().min(1),
    }),

    z.object({
      type: z.literal("IMAGE"),
      src: z.string().min(1),
    }),

    z.object({
      type: z.literal("VIDEO"),
      src: z.string().min(1),
    }),
  ]),
});

export type CreateSliceRequest =
  z.infer<typeof createSliceSchema>;