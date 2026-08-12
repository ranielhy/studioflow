import { database } from "../../../database/connection.js";

export interface ComponentRow {
  id: number;
  slice_id: number;

  name: string;

  x: number;
  y: number;

  width: number;
  height: number;

  rotation: number;
  opacity: number;

  start_time: number;
  end_time: number | null;

  z_index: number;

  visible: boolean;
  locked: boolean;
  editable: boolean;

  created_at: Date;
  updated_at: Date;
}

export interface CreateComponentRepositoryInput {
  sliceId: number;

  name: string;

  x: number;
  y: number;

  width: number;
  height: number;

  rotation: number;
  opacity: number;

  startTime: number;
  endTime: number | null;

  zIndex: number;

  visible: boolean;
  locked: boolean;
  editable: boolean;
}

export async function createComponent(
  input: CreateComponentRepositoryInput,
): Promise<ComponentRow> {
  const [component] = await database<ComponentRow>("components")
    .insert({
      slice_id: input.sliceId,

      name: input.name,

      x: input.x,
      y: input.y,

      width: input.width,
      height: input.height,

      rotation: input.rotation,
      opacity: input.opacity,

      start_time: input.startTime,
      end_time: input.endTime,

      z_index: input.zIndex,

      visible: input.visible,
      locked: input.locked,
      editable: input.editable,
    })
    .returning("*");

  if (!component) {
    throw new Error("Failed to create component");
  }

  return component;
}

export async function findComponentById(
  id: number,
): Promise<ComponentRow | null> {
  const component = await database<ComponentRow>("components")
    .where({ id })
    .first();

  return component ?? null;
}

export async function listComponentsBySlice(
  sliceId: number,
): Promise<ComponentRow[]> {
  return database<ComponentRow>("components")
    .where({
      slice_id: sliceId,
    })
    .orderBy("z_index", "asc");
}

export interface UpdateComponentRepositoryInput {
  name?: string;

  x?: number;
  y?: number;

  width?: number;
  height?: number;

  rotation?: number;
  opacity?: number;

  startTime?: number;
  endTime?: number | null;

  zIndex?: number;

  visible?: boolean;
  locked?: boolean;
  editable?: boolean;
}

export async function updateComponent(
  id: number,
  input: UpdateComponentRepositoryInput,
): Promise<ComponentRow | null> {
  const values: Partial<ComponentRow> = {};

  if (input.name !== undefined) {
    values.name = input.name;
  }

  if (input.x !== undefined) {
    values.x = input.x;
  }

  if (input.y !== undefined) {
    values.y = input.y;
  }

  if (input.width !== undefined) {
    values.width = input.width;
  }

  if (input.height !== undefined) {
    values.height = input.height;
  }

  if (input.rotation !== undefined) {
    values.rotation = input.rotation;
  }

  if (input.opacity !== undefined) {
    values.opacity = input.opacity;
  }

  if (input.startTime !== undefined) {
    values.start_time = input.startTime;
  }

  if (input.endTime !== undefined) {
    values.end_time = input.endTime;
  }

  if (input.zIndex !== undefined) {
    values.z_index = input.zIndex;
  }

  if (input.visible !== undefined) {
    values.visible = input.visible;
  }

  if (input.locked !== undefined) {
    values.locked = input.locked;
  }

  if (input.editable !== undefined) {
    values.editable = input.editable;
  }

  const [component] = await database<ComponentRow>("components")
    .where({ id })
    .update({
      ...values,
      updated_at: database.fn.now(),
    })
    .returning("*");

  return component ?? null;
}

export async function deleteComponent(
  id: number,
): Promise<boolean> {
  const deletedRows = await database<ComponentRow>("components")
    .where({ id })
    .delete();

  return deletedRows > 0;
}