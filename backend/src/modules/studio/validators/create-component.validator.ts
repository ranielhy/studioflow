import { z } from "zod";

const textBlockSchema = z.object({
  type: z.literal("TEXT"),

  properties: z.object({
    text: z.string(),

    fontFamily: z.string().min(1),

    fontSize: z
      .number()
      .positive(),

    color: z.string().min(1),
  }),
});

const imageBlockSchema = z.object({
  type: z.literal("IMAGE"),

  properties: z.object({
    src: z.string().min(1),

    fit: z.enum([
      "cover",
      "contain",
    ]),
  }),
});

const videoBlockSchema = z.object({
  type: z.literal("VIDEO"),

  properties: z.object({
    src: z.string().min(1),

    volume: z
      .number()
      .min(0)
      .max(1),

    loop: z.boolean(),
  }),
});

const blockSchema = z.discriminatedUnion(
  "type",
  [
    textBlockSchema,
    imageBlockSchema,
    videoBlockSchema,
  ],
);

export const createComponentSchema = z
  .object({
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
        .positive(
          "Width must be greater than zero",
        ),

      height: z
        .number()
        .positive(
          "Height must be greater than zero",
        ),
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

    block: blockSchema,
  })
  .refine(
    (data) =>
      data.endTime === null ||
      data.endTime >= data.startTime,
    {
      path: ["endTime"],
      message:
        "endTime cannot be before startTime",
    },
  );