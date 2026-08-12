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

export const createBlockSchema =
  z.discriminatedUnion("type", [
    textBlockSchema,
    imageBlockSchema,
    videoBlockSchema,
  ]);