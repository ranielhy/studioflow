import type { NextFunction, Request, Response } from "express";
import { findBlockById } from "../repositories/block.repository.js";

export async function getBlockController(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) return response.status(400).json({ error: "invalid_block_id", message: "Block id must be a positive integer" });
    const block = await findBlockById(id);
    if (!block) return response.status(404).json({ error: "block_not_found", message: "Block not found" });
    return response.status(200).json({ data: block });
  } catch (error) { next(error); }
}
