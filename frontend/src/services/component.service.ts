import type {
  Component,
  UpdateComponentInput,
} from "../types/component";

import { api } from "./api";

type ComponentWithoutBlock = Omit<
  Component,
  "block"
>;

interface BlockResponse {
  data: Component["block"] & {
    component_id?: number;
    created_at?: string;
    updated_at?: string;
  };
}

interface ListComponentsResponse {
  data: ComponentWithoutBlock[];
}

interface UpdateComponentResponse {
  data: Component;
}

export async function listComponentsBySlice(
  sliceId: number,
): Promise<Component[]> {
  const response =
    await api.get<ListComponentsResponse>(
      `/slices/${sliceId}/components`,
    );

  const components =
    response.data.data;

  const componentsWithBlocks =
    await Promise.allSettled(
      components.map(
        async (component) => {
          const blockResponse =
            await api.get<BlockResponse>(
              `/components/${component.id}/block`,
            );

          return {
            ...component,
            block: blockResponse.data.data,
          };
        },
      ),
    );

  return componentsWithBlocks.flatMap(
    (result) =>
      result.status === "fulfilled"
        ? [result.value]
        : [],
  );
}

export async function updateComponent({
  id,
  ...input
}: UpdateComponentInput): Promise<Component> {
  const response =
    await api.patch<UpdateComponentResponse>(
      `/components/${id}`,
      input,
    );

  return response.data.data;
}
