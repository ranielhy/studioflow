import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { createSliceService } from "../services/create-slice.service.js";
import { createSliceSchema } from "../validators/create-slice.validator.js";

export async function createSliceController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const templateId = Number(
      request.params.templateId,
    );

    if (
      !Number.isInteger(templateId) ||
      templateId <= 0
    ) {
      return response.status(400).json({
        error: "invalid_template_id",
        message:
          "Template id must be a positive integer",
      });
    }

    const input = createSliceSchema.parse(
      request.body,
    );

    const slice = await createSliceService({
      templateId,
      ...input,
    });

    return response.status(201).json({
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