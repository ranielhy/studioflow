import type { NextFunction, Request, Response } from "express";
import { updateBlock } from "../repositories/block.repository.js";
import { updateBlockSchema } from "../validators/update-block.validator.js";

export async function updateBlockController(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) return response.status(400).json({ error: "invalid_block_id", message: "Block id must be a positive integer" });
    const input = updateBlockSchema.parse(request.body);
    const block = await updateBlock(id, input);
    if (!block) return response.status(404).json({ error: "block_not_found", message: "Block not found" });
    return response.status(200).json({ data: block });
  } catch (error) { next(error); }
}
