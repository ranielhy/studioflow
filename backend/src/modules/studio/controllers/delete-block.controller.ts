import type { NextFunction, Request, Response } from "express";
import { deleteBlock } from "../repositories/block.repository.js";

export async function deleteBlockController(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) return response.status(400).json({ error: "invalid_block_id", message: "Block id must be a positive integer" });
    if (!(await deleteBlock(id))) return response.status(404).json({ error: "block_not_found", message: "Block not found" });
    return response.status(204).send();
  } catch (error) { next(error); }
}
