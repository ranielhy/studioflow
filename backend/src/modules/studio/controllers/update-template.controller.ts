import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { updateTemplate } from "../repositories/template.repository.js";
import { updateTemplateSchema } from "../validators/update-template.validator.js";

export async function updateTemplateController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({
        error: "invalid_template_id",
        message: "Template id must be a positive integer",
      });
    }

    const input = updateTemplateSchema.parse(request.body);
    const templateInput = {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.mediaType !== undefined ? { mediaType: input.mediaType } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.width !== undefined ? { width: input.width } : {}),
      ...(input.height !== undefined ? { height: input.height } : {}),
    };

    const template = await updateTemplate(
      id,
      templateInput,
    );

    if (!template) {
      return response.status(404).json({
        error: "template_not_found",
        message: "Template not found",
      });
    }

    return response.status(200).json({
      data: {
        id: template.id,

        name: template.name,
        description: template.description,

        mediaType: template.media_type,
        status: template.status,

        width: template.width,
        height: template.height,

        createdAt: template.created_at,
        updatedAt: template.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
}