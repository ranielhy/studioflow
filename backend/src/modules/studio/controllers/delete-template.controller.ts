import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { deleteTemplate } from "../repositories/template.repository.js";

export async function deleteTemplateController(
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

    const deleted = await deleteTemplate(id);

    if (!deleted) {
      return response.status(404).json({
        error: "template_not_found",
        message: "Template not found",
      });
    }

    return response.status(204).send();
  } catch (error) {
    next(error);
  }
}