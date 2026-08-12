import { database } from "../../../database/connection.js";
import { AppError } from "../../../errors/app-error.js";
import {
  findBlockByComponent,
  updateBlock,
  type BlockRow,
} from "../repositories/block.repository.js";
import {
  findComponentById,
  updateComponent,
  type ComponentRow,
} from "../repositories/component.repository.js";
import { findSliceById } from "../repositories/slice.repository.js";
import type { UpdateComponentRequest } from "../validators/update-component.validator.js";

export interface UpdateComponentServiceResult {
  component: ComponentRow;
  block: BlockRow;
}

export async function updateComponentService(
  id: number,
  input: UpdateComponentRequest,
): Promise<UpdateComponentServiceResult> {
  const component = await findComponentById(id);

  if (!component) {
    throw new AppError("Component not found", 404, "component_not_found");
  }

  const block = await findBlockByComponent(id);

  if (!block) {
    throw new AppError(
      "Component does not have a block",
      409,
      "component_block_missing",
    );
  }

  const startTime = input.startTime ?? Number(component.start_time);
  const endTime = input.endTime !== undefined
    ? input.endTime
    : component.end_time === null
      ? null
      : Number(component.end_time);

  if (endTime !== null && endTime < startTime) {
    throw new AppError(
      "Component endTime cannot be before startTime",
      400,
      "component_time_invalid",
    );
  }

  const slice = await findSliceById(component.slice_id);

  if (slice && endTime !== null && endTime > Number(slice.duration)) {
    throw new AppError(
      "Component endTime cannot exceed slice duration",
      400,
      "component_duration_invalid",
    );
  }

  return database.transaction(async (trx) => {
    const updatedComponent = await updateComponent(
      id,
      {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.position?.x !== undefined && { x: input.position.x }),
        ...(input.position?.y !== undefined && { y: input.position.y }),
        ...(input.size?.width !== undefined && { width: input.size.width }),
        ...(input.size?.height !== undefined && { height: input.size.height }),
        ...(input.rotation !== undefined && { rotation: input.rotation }),
        ...(input.opacity !== undefined && { opacity: input.opacity }),
        ...(input.startTime !== undefined && { startTime: input.startTime }),
        ...(input.endTime !== undefined && { endTime: input.endTime }),
        ...(input.zIndex !== undefined && { zIndex: input.zIndex }),
        ...(input.visible !== undefined && { visible: input.visible }),
        ...(input.locked !== undefined && { locked: input.locked }),
        ...(input.editable !== undefined && { editable: input.editable }),
      },
      trx,
    );

    if (!updatedComponent) {
      throw new AppError("Component not found", 404, "component_not_found");
    }

    const updatedBlock = input.block
      ? await updateBlock(
          block.id,
          {
            type: input.block.type,
            properties: input.block.properties,
          },
          trx,
        )
      : block;

    if (!updatedBlock) {
      throw new AppError("Block not found", 404, "block_not_found");
    }

    return {
      component: updatedComponent,
      block: updatedBlock,
    };
  });
}
