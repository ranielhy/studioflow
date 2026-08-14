import { useQuery } from "@tanstack/react-query";

import { listTemplates } from "../../services/template.service";

export function useTemplates() {
  return useQuery({
    queryKey: ["templates"],

    queryFn: listTemplates,
  });
}