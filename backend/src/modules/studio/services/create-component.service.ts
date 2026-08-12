import { database } from "../../../database/connection.js";
import { AppError } from "../../../errors/app-error.js";
import type {
  BlockPropertiesMap,
  BlockType,
} from "../domain/block.js";
import { createComponent as createComponentDomain } from "../domain/component.js";
import {
  createBlock as createBlockRepository,
  type BlockRow,
} from "../repositories/block.repository.js";
import {
  createComponent as createComponentRepository,
  type ComponentRow,
} from "../repositories/component.repository.js";
import { findSliceById } from "../repositories/slice.repository.js";

export interface CreateComponentServiceInput<T extends BlockType = BlockType> {
  sliceId: number;
  name: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  startTime: number;
  endTime: number | null;
  rotation: number;
  opacity: number;
  zIndex: number;
  visible: boolean;
  locked: boolean;
  editable: boolean;
  block: {
    type: T;
    properties: BlockPropertiesMap[T];
  };
}

export interface CreateComponentServiceResult {
  component: ComponentRow;
  block: BlockRow;
}

export async function createComponentService<T extends BlockType>(
  input: CreateComponentServiceInput<T>,
): Promise<CreateComponentServiceResult> {
  const slice = await findSliceById(input.sliceId);

  if (!slice) {
    throw new AppError("Slice not found", 404, "slice_not_found");
  }

  if (input.endTime !== null && input.endTime > Number(slice.duration)) {
    throw new AppError(
      "Component endTime cannot exceed slice duration",
      400,
      "component_duration_invalid",
    );
  }

  const domainComponent = createComponentDomain({
    name: input.name,
    position: input.position,
    size: input.size,
    startTime: input.startTime,
    endTime: input.endTime,
    rotation: input.rotation,
    opacity: input.opacity,
    zIndex: input.zIndex,
    visible: input.visible,
    locked: input.locked,
    editable: input.editable,
    block: input.block,
  });

  return database.transaction(async (trx) => {
    const component = await createComponentRepository(
      {
        sliceId: input.sliceId,
        name: domainComponent.name,
        x: domainComponent.position.x,
        y: domainComponent.position.y,
        width: domainComponent.size.width,
        height: domainComponent.size.height,
        startTime: domainComponent.startTime,
        endTime: domainComponent.endTime,
        rotation: domainComponent.rotation,
        opacity: domainComponent.opacity,
        zIndex: domainComponent.zIndex,
        visible: domainComponent.visible,
        locked: domainComponent.locked,
        editable: domainComponent.editable,
      },
      trx,
    );

    const block = await createBlockRepository(
      {
        componentId: component.id,
        type: domainComponent.block.type,
        properties: domainComponent.block.properties,
      },
      trx,
    );

    return { component, block };
  });
}
