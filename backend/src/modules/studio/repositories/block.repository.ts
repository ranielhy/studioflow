import { database } from "../../../database/connection.js";
import type { Knex } from "knex";
import type { BlockPropertiesMap } from "../domain/block.js";

export type BlockType =
  | "TEXT"
  | "IMAGE"
  | "VIDEO";

export interface BlockRow {
  id: number;

  component_id: number;

  type: BlockType;

  properties: BlockPropertiesMap[BlockType];

  created_at: Date;
  updated_at: Date;
}

export interface CreateBlockRepositoryInput {
  componentId: number;

  type: BlockType;

  properties: BlockPropertiesMap[BlockType];
}

export async function createBlock(
  input: CreateBlockRepositoryInput,
  db: Knex | Knex.Transaction = database,
): Promise<BlockRow> {
  const [block] = await db<BlockRow>("blocks")
    .insert({
      component_id: input.componentId,
      type: input.type,
      properties: input.properties,
    })
    .returning("*");

  if (!block) {
    throw new Error("Failed to create block");
  }

  return block;
}

export async function findBlockById(
  id: number,
): Promise<BlockRow | null> {
  const block = await database<BlockRow>("blocks")
    .where({ id })
    .first();

  return block ?? null;
}

export async function findBlockByComponent(
  componentId: number,
): Promise<BlockRow | null> {
  const block = await database<BlockRow>("blocks")
    .where({
      component_id: componentId,
    })
    .first();

  return block ?? null;
}
export interface UpdateBlockRepositoryInput {
  type?: BlockType;

  properties?: BlockPropertiesMap[BlockType];
}

export async function updateBlock(
  id: number,
  input: UpdateBlockRepositoryInput,
  db: Knex | Knex.Transaction = database,
): Promise<BlockRow | null> {
  const values: Partial<BlockRow> = {};

  if (input.type !== undefined) {
    values.type = input.type;
  }

  if (input.properties !== undefined) {
    values.properties = input.properties;
  }

  const [block] = await db<BlockRow>("blocks")
    .where({ id })
    .update({
      ...values,
      updated_at: database.fn.now(),
    })
    .returning("*");

  return block ?? null;
}

export async function deleteBlock(
  id: number,
): Promise<boolean> {
  const deletedRows = await database<BlockRow>("blocks")
    .where({ id })
    .delete();

  return deletedRows > 0;
}
