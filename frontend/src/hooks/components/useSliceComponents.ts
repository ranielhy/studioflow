import { useQuery } from "@tanstack/react-query";

import { listComponentsBySlice } from "../../services/component.service";

export function useSliceComponents(
  sliceId: number,
) {
  return useQuery({
    queryKey: [
      "slices",
      sliceId,
      "components",
    ],

    queryFn: () =>
      listComponentsBySlice(sliceId),

    enabled: sliceId > 0,
  });
}