import type {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  findSliceById,
  findSliceByTemplateAndId,
} from "../repositories/slice.repository.js";

export async function getSliceController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const id = Number(request.params.id);
    const templateIdParam = request.params.templateId;

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({
        error: "invalid_slice_id",
        message:
          "Slice id must be a positive integer",
      });
    }

    let slice;

    if (templateIdParam !== undefined) {
      const templateId = Number(templateIdParam);

      if (!Number.isInteger(templateId) || templateId <= 0) {
        return response.status(400).json({
          error: "invalid_template_id",
          message: "Template id must be a positive integer",
        });
      }

      slice = await findSliceByTemplateAndId(templateId, id);
    } else {
      slice = await findSliceById(id);
    }

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
