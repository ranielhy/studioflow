import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { createTemplateService } from "../services/create-template.service";
import { createTemplateSchema } from "../validators/create-template.validator";

export async function createTemplateController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const input = createTemplateSchema.parse(
      request.body,
    );

    const template = await createTemplateService({
      name: input.name,
      ...(input.description !== undefined && {
        description: input.description,
      }),
      mediaType: input.mediaType,
      status: input.status,
      width: input.width,
      height: input.height,
    });

    return response.status(201).json({
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
