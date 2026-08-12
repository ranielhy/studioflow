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
