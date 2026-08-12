import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { listSlicesByTemplate } from "../repositories/slice.repository.js";

export async function listSlicesController(
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

    const slices =
      await listSlicesByTemplate(templateId);

    return response.status(200).json({
      data: slices.map((slice) => ({
        id: slice.id,
        templateId: slice.template_id,

        name: slice.name,
        position: slice.position,
        duration: slice.duration,

        background: slice.background,

        createdAt: slice.created_at,
        updatedAt: slice.updated_at,
      })),
    });
  } catch (error) {
    next(error);
  }
}