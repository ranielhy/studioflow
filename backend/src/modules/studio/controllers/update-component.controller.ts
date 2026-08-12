import type { NextFunction, Request, Response } from "express";

import { updateComponentService } from "../services/update-component.service.js";
import { updateComponentSchema } from "../validators/update-component.validator.js";

export async function updateComponentController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({
        error: "invalid_component_id",
        message: "Component id must be a positive integer",
      });
    }

    const input = updateComponentSchema.parse(request.body);
    const { component, block } = await updateComponentService(id, input);

    return response.status(200).json({
      data: {
        id: component.id,
        sliceId: component.slice_id,
        name: component.name,
        position: { x: component.x, y: component.y },
        size: { width: component.width, height: component.height },
        rotation: component.rotation,
        opacity: component.opacity,
        startTime: component.start_time,
        endTime: component.end_time,
        zIndex: component.z_index,
        visible: component.visible,
        locked: component.locked,
        editable: component.editable,
        block: {
          id: block.id,
          type: block.type,
          properties: block.properties,
        },
        createdAt: component.created_at,
        updatedAt: component.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
}
