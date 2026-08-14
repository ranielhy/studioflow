import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createTemplate } from "../../services/template.service";

export function useCreateTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTemplate,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["templates"],
      });
    },
  });
}