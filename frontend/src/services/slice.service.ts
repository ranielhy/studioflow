import type { Slice } from "../types/slice";

import { api } from "./api";

interface ListSlicesResponse {
  data: Slice[];
}

export async function listSlicesByTemplate(
  templateId: number,
): Promise<Slice[]> {
  const response =
    await api.get<ListSlicesResponse>(
      `/templates/${templateId}/slices`,
    );

  return response.data.data;
}