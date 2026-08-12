import type { NextFunction, Request, Response } from "express";

import { listTemplates } from "../repositories/template.repository.js";

export async function listTemplatesController(
  _request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const templates = await listTemplates();

    return response.status(200).json({
      data: templates.map((template) => ({
        id: template.id,
        name: template.name,
        description: template.description,

        mediaType: template.media_type,
        status: template.status,

        width: template.width,
        height: template.height,

        createdAt: template.created_at,
        updatedAt: template.updated_at,
      })),
    });
  } catch (error) {
    next(error);
  }
}