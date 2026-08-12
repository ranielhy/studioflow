import { createTemplate } from "../domain/template";
import {
  createTemplate as createTemplateRepository,
  type TemplateRow,
} from "../repositories/template.repository";

export interface CreateTemplateServiceInput {
  name: string;
  description?: string;

  mediaType: "IMAGE" | "VIDEO" | "PDF";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";

  width: number;
  height: number;
}

export async function createTemplateService(
  input: CreateTemplateServiceInput,
): Promise<TemplateRow> {
  const template = createTemplate({
    name: input.name,
    ...(input.description !== undefined && {
      description: input.description,
    }),

    mediaType: input.mediaType,
    status: input.status,

    width: input.width,
    height: input.height,

    slices: [],
  });

  return createTemplateRepository({
    name: template.name,
    ...(template.description !== undefined && {
      description: template.description,
    }),

    mediaType: template.mediaType,
    status: template.status,

    width: template.width,
    height: template.height,
  });
}
