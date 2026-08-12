import type { NextFunction, Request, Response } from "express";

import { findBlockByComponent } from "../repositories/block.repository.js";
import { findComponentById } from "../repositories/component.repository.js";

export async function getComponentBlockController(
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

    if (!(await findComponentById(componentId))) {
      return response.status(404).json({
        error: "component_not_found",
        message: "Component not found",
      });
    }

    const block = await findBlockByComponent(componentId);

    if (!block) {
      return response.status(404).json({
        error: "block_not_found",
        message: "Block not found",
      });
    }

    return response.status(200).json({ data: block });
  } catch (error) {
    next(error);
  }
}
