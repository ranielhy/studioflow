import { z } from "zod";

export const createComponentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Component name is required")
    .max(150),

  position: z.object({
    x: z.number(),
    y: z.number(),
  }),

  size: z.object({
    width: z
      .number()
      .positive("Width must be greater than zero"),

    height: z
      .number()
      .positive("Height must be greater than zero"),
  }),

  rotation: z.number().default(0),

  opacity: z
    .number()
    .min(0)
    .max(100)
    .default(100),

  startTime: z
    .number()
    .min(0)
    .default(0),

  endTime: z
    .number()
    .min(0)
    .nullable()
    .default(null),

  zIndex: z
    .number()
    .int()
    .default(0),

  visible: z.boolean().default(true),

  locked: z.boolean().default(false),

  editable: z.boolean().default(true),
}).refine(
  (data) =>
    data.endTime === null ||
    data.endTime >= data.startTime,
  {
    message: "endTime cannot be before startTime",
    path: ["endTime"],
  },
);