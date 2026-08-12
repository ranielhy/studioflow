import type { NextFunction, Request, Response } from "express";

import { findTemplateById } from "../repositories/template.repository.js";

export async function getTemplateController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { id } = request.params;
    const templateId = Number(id);

    if (!Number.isInteger(templateId) || templateId <= 0) {
      return response.status(400).json({
        error: "invalid_template_id",
        message: "Invalid template id",
      });
    }

    const template = await findTemplateById(templateId);

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