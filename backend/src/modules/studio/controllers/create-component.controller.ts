import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { createComponentService } from "../services/create-component.service.js";
import { createComponentSchema } from "../validators/create-component.validator.js";

export async function createComponentController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const sliceId = Number(request.params.sliceId);

    if (!Number.isInteger(sliceId) || sliceId <= 0) {
      return response.status(400).json({
        error: "invalid_slice_id",
        message: "Slice id must be a positive integer",
      });
    }

    const input = createComponentSchema.parse(
      request.body,
    );

    const { component, block } = await createComponentService({
      sliceId,
      ...input,
    });

    return response.status(201).json({
      data: {
        id: component.id,
        sliceId: component.slice_id,

        name: component.name,

        position: {
          x: component.x,
          y: component.y,
        },

        size: {
          width: component.width,
          height: component.height,
        },

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
