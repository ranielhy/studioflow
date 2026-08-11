import { database } from "../../../database/connection.js";

export interface TemplateRow {
  id: string;

  name: string;
  description: string | null;

  media_type: "IMAGE" | "VIDEO" | "PDF";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";

  width: number;
  height: number;

  created_at: Date;
  updated_at: Date;
}

export interface CreateTemplateRepositoryInput {
  name: string;
  description?: string;

  mediaType: "IMAGE" | "VIDEO" | "PDF";

  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";

  width: number;
  height: number;
}

export async function createTemplate(
  input: CreateTemplateRepositoryInput,
): Promise<TemplateRow> {
  const [template] = await database<TemplateRow>("templates")
    .insert({
      name: input.name,

      description: input.description ?? null,

      media_type: input.mediaType,

      status: input.status,

      width: input.width,
      height: input.height,
    })
    .returning("*");

  if (!template) {
    throw new Error("Failed to create template");
  }

  return template;
}

export async function findTemplateById(
  id: string,
): Promise<TemplateRow | null> {
  const template = await database<TemplateRow>("templates")
    .where({ id })
    .first();

  return template ?? null;
}

export async function listTemplates(): Promise<
  TemplateRow[]
> {
  return database<TemplateRow>("templates")
    .select("*")
    .orderBy("created_at", "desc");
}

export interface UpdateTemplateRepositoryInput {
  name?: string;
  description?: string | null;

  mediaType?: "IMAGE" | "VIDEO" | "PDF";

  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";

  width?: number;
  height?: number;
}

export async function updateTemplate(
  id: string,
  input: UpdateTemplateRepositoryInput,
): Promise<TemplateRow | null> {
  const values: Partial<TemplateRow> = {};

  if (input.name !== undefined) {
    values.name = input.name;
  }

  if (input.description !== undefined) {
    values.description = input.description;
  }

  if (input.mediaType !== undefined) {
    values.media_type = input.mediaType;
  }

  if (input.status !== undefined) {
    values.status = input.status;
  }

  if (input.width !== undefined) {
    values.width = input.width;
  }

  if (input.height !== undefined) {
    values.height = input.height;
  }

  const [template] = await database<TemplateRow>(
    "templates",
  )
    .where({ id })
    .update({
      ...values,
      updated_at: database.fn.now(),
    })
    .returning("*");

  return template ?? null;
}

export async function deleteTemplate(
  id: string,
): Promise<boolean> {
  const deletedRows = await database<TemplateRow>(
    "templates",
  )
    .where({ id })
    .delete();

  return deletedRows > 0;
}