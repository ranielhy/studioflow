import { createSlice as createSliceDomain } from "../domain/slice.js";

import { findTemplateById } from "../repositories/template.repository.js";

import {
  createSlice as createSliceRepository,
  type SliceRow,
} from "../repositories/slice.repository.js";

import { AppError } from "../../../errors/app-error.js";

export interface CreateSliceServiceInput {
  templateId: number;

  name: string;
  position: number;
  duration: number;

  background:
    | {
        type: "COLOR";
        value: string;
      }
    | {
        type: "IMAGE";
        src: string;
      }
    | {
        type: "VIDEO";
        src: string;
      };
}

export async function createSliceService(
  input: CreateSliceServiceInput,
): Promise<SliceRow> {
  const template = await findTemplateById(
    input.templateId,
  );

  if (!template) {
    throw new AppError("Template not found", 404,"template_not_found",);
  }

  const slice = createSliceDomain({
    name: input.name,
    position: input.position,
    duration: input.duration,
    background: input.background,
    components: [],
  });

  return createSliceRepository({
    templateId: input.templateId,

    name: slice.name,
    position: slice.position,
    duration: slice.duration,

    background: slice.background,
  });
}