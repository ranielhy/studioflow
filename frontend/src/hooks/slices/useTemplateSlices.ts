import { useQuery } from "@tanstack/react-query";

import { listSlicesByTemplate } from "../../services/slice.service";

export function useTemplateSlices(
  templateId: number,
) {
  return useQuery({
    queryKey: [
      "templates",
      templateId,
      "slices",
    ],

    queryFn: () =>
      listSlicesByTemplate(
        templateId,
      ),

    enabled: templateId > 0,
  });
}