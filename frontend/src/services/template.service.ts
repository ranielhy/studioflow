import { api } from "./api";

import type {
  CreateTemplateInput,
  Template,
} from "../types/template";

interface ListTemplatesResponse {
  data: Template[];
}

interface CreateTemplateResponse {
  data: Template;
}

export async function listTemplates(): Promise<
  Template[]
> {
  const response =
    await api.get<ListTemplatesResponse>(
      "/templates",
    );

  return response.data.data;
}

export async function createTemplate(
  input: CreateTemplateInput,
): Promise<Template> {
  const response =
    await api.post<CreateTemplateResponse>(
      "/templates",
      input,
    );

  return response.data.data;
}