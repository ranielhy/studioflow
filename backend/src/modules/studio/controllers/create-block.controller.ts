import type { NextFunction, Request, Response } from "express";

import { createBlockService } from "../services/create-block.service.js";
import { createBlockSchema } from "../validators/create-block.validator.js";

export async function createBlockController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const componentId = Number(request.params.componentId);

    if (!Number.isInteger(componentId) || componentId <= 0) {
      return response.status(400).json({
        error: "invalid_component_id",
        message: "Component id must be a positive integer",
      });
    }

    const input = createBlockSchema.parse(request.body);
    const block = await createBlockService({ componentId, ...input });

    return response.status(201).json({ data: block });
  } catch (error) {
    next(error);
  }
}
