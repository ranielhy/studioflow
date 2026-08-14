import { useQuery } from "@tanstack/react-query";

import { getTemplateById } from "../../services/template.service";

export function useTemplate(
  templateId: number,
) {
  return useQuery({
    queryKey: [
      "templates",
      templateId,
    ],

    queryFn: () =>
      getTemplateById(templateId),

    enabled: templateId > 0,
  });
}