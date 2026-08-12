import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { deleteSlice } from "../repositories/slice.repository.js";

export async function deleteSliceController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({
        error: "invalid_slice_id",
        message: "Slice id must be a positive integer",
      });
    }

    const deleted = await deleteSlice(id);

    if (!deleted) {
      return response.status(404).json({
        error: "slice_not_found",
        message: "Slice not found",
      });
    }

    return response.status(204).send();
  } catch (error) {
    next(error);
  }
}