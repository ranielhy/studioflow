import { api } from "./api";

import type {
  Template,
} from "../types/template";

interface ListTemplatesResponse {
  data: Template[];
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