import { z } from "zod";
import { createBlockSchema } from "./create-block.validator.js";

export const updateComponentSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Component name cannot be empty")
      .max(150)
      .optional(),

    position: z
      .object({
        x: z.number().optional(),
        y: z.number().optional(),
      })
      .refine((position) => Object.keys(position).length > 0, {
        message: "At least one position field must be provided",
      })
      .optional(),

    size: z
      .object({
        width: z
          .number()
          .positive("Width must be greater than zero")
          .optional(),
        height: z
          .number()
          .positive("Height must be greater than zero")
          .optional(),
      })
      .refine((size) => Object.keys(size).length > 0, {
        message: "At least one size field must be provided",
      })
      .optional(),

    rotation: z.number().optional(),
    opacity: z.number().min(0).max(100).optional(),
    startTime: z.number().min(0).optional(),
    endTime: z.number().min(0).nullable().optional(),
    zIndex: z.number().int().optional(),
    visible: z.boolean().optional(),
    locked: z.boolean().optional(),
    editable: z.boolean().optional(),
    block: createBlockSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  })
  .refine(
    (data) =>
      data.startTime === undefined ||
      data.endTime === undefined ||
      data.endTime === null ||
      data.endTime >= data.startTime,
    {
      message: "endTime cannot be before startTime",
      path: ["endTime"],
    },
  );

export type UpdateComponentRequest = z.infer<
  typeof updateComponentSchema
>;
