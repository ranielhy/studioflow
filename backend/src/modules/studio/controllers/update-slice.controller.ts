import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { updateSlice } from "../repositories/slice.repository.js";
import { updateSliceSchema } from "../validators/update-slice.validator.js";

export async function updateSliceController(
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

    const input = updateSliceSchema.parse(
      request.body,
    );

    const sliceInput = {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.position !== undefined && { position: input.position }),
      ...(input.duration !== undefined && { duration: input.duration }),
      ...(input.background !== undefined && { background: input.background }),
    };

    const slice = await updateSlice(id, sliceInput);

    if (!slice) {
      return response.status(404).json({
        error: "slice_not_found",
        message: "Slice not found",
      });
    }

    return response.status(200).json({
      data: {
        id: slice.id,
        templateId: slice.template_id,

        name: slice.name,
        position: slice.position,
        duration: slice.duration,

        background: slice.background,

        createdAt: slice.created_at,
        updatedAt: slice.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
}
