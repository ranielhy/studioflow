import { z } from "zod";

import { createBlockSchema } from "./create-block.validator.js";

export const updateBlockSchema = createBlockSchema;

export type UpdateBlockRequest = z.infer<typeof updateBlockSchema>;
