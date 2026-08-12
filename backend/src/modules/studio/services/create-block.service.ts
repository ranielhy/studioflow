import { AppError } from "../../../errors/app-error.js";
import {
  type BlockPropertiesMap,
  type BlockType,
  createBlock as createBlockDomain,
} from "../domain/block.js";
import {
  createBlock as createBlockRepository,
  findBlockByComponent,
  type BlockRow,
} from "../repositories/block.repository.js";
import { findComponentById } from "../repositories/component.repository.js";

export interface CreateBlockServiceInput<T extends BlockType = BlockType> {
  componentId: number;
  type: T;
  properties: BlockPropertiesMap[T];
}

export async function createBlockService<T extends BlockType>(
  input: CreateBlockServiceInput<T>,
): Promise<BlockRow> {
  const component = await findComponentById(input.componentId);

  if (!component) {
    throw new AppError("Component not found", 404, "component_not_found");
  }

  const existingBlock = await findBlockByComponent(input.componentId);

  if (existingBlock) {
    throw new AppError(
      "Component already has a block",
      409,
      "component_block_exists",
    );
  }

  const block = createBlockDomain({
    type: input.type,
    properties: input.properties,
  });

  return createBlockRepository({
    componentId: input.componentId,
    type: block.type,
    properties: block.properties,
  });
}
