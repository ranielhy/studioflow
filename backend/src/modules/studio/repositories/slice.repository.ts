import { database } from "../../../database/connection.js";

export interface SliceRow {
  id: number;
  template_id: number;

  name: string;
  position: number;
  duration: number;

  background: Record<string, unknown>;

  created_at: Date;
  updated_at: Date;
}

export interface CreateSliceRepositoryInput {
  templateId: number;

  name: string;
  position: number;
  duration: number;

  background: Record<string, unknown>;
}

export async function createSlice(
  input: CreateSliceRepositoryInput,
): Promise<SliceRow> {
  const [slice] = await database<SliceRow>("slices")
    .insert({
      template_id: input.templateId,
      name: input.name,
      position: input.position,
      duration: input.duration,
      background: input.background,
    })
    .returning("*");

  if (!slice) {
    throw new Error("Failed to create slice");
  }

  return slice;
}

export async function findSliceById(
  id: number,
): Promise<SliceRow | null> {
  const slice = await database<SliceRow>("slices")
    .where({ id })
    .first();

  return slice ?? null;
}

export async function findSliceByTemplateAndId(
  templateId: number,
  id: number,
): Promise<SliceRow | null> {
  const slice = await database<SliceRow>("slices")
    .where({
      id,
      template_id: templateId,
    })
    .first();

  return slice ?? null;
}

export async function listSlicesByTemplate(
  templateId: number,
): Promise<SliceRow[]> {
  return database<SliceRow>("slices")
    .where({
      template_id: templateId,
    })
    .orderBy("position", "asc");
}

export interface UpdateSliceRepositoryInput {
  name?: string;
  position?: number;
  duration?: number;

  background?: Record<string, unknown>;
}

export async function updateSlice(
  id: number,
  input: UpdateSliceRepositoryInput,
): Promise<SliceRow | null> {
  const values: Partial<SliceRow> = {};

  if (input.name !== undefined) values.name = input.name;
  if (input.position !== undefined) values.position = input.position;
  if (input.duration !== undefined) values.duration = input.duration;
  if (input.background !== undefined) values.background = input.background;

  const [slice] = await database<SliceRow>("slices")
    .where({ id })
    .update({
      ...values,
      updated_at: database.fn.now(),
    })
    .returning("*");

  return slice ?? null;
}

export async function deleteSlice(
  id: number,
): Promise<boolean> {
  const deletedRows = await database<SliceRow>("slices")
    .where({ id })
    .delete();

  return deletedRows > 0;
}
