import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { listComponentsBySlice } from "../repositories/component.repository.js";
import { findSliceById } from "../repositories/slice.repository.js";

export async function listComponentsController(
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

    const slice = await findSliceById(sliceId);

    if (!slice) {
      return response.status(404).json({
        error: "slice_not_found",
        message: "Slice not found",
      });
    }

    const components = await listComponentsBySlice(sliceId);

    return response.status(200).json({
      data: components.map((component) => ({
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
        createdAt: component.created_at,
        updatedAt: component.updated_at,
      })),
    });
  } catch (error) {
    next(error);
  }
}
