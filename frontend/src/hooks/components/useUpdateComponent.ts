import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateComponent } from "../../services/component.service";

import type {
  Component,
  UpdateComponentInput,
} from "../../types/component";

interface UseUpdateComponentOptions {
  sliceId: number;
}

export function useUpdateComponent({
  sliceId,
}: UseUpdateComponentOptions) {
  const queryClient = useQueryClient();

  const queryKey = [
    "slices",
    sliceId,
    "components",
  ];

  return useMutation({
    mutationFn: updateComponent,

    onMutate: async (
      input: UpdateComponentInput,
    ) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousComponents =
        queryClient.getQueryData<Component[]>(
          queryKey,
        );

      queryClient.setQueryData<Component[]>(
        queryKey,
        (currentComponents) =>
          currentComponents?.map(
            (component) => {
              if (component.id !== input.id) {
                return component;
              }

              return {
                ...component,
                ...(input.position && {
                  position: {
                    ...component.position,
                    ...input.position,
                  },
                }),
                ...(input.size && {
                  size: {
                    ...component.size,
                    ...input.size,
                  },
                }),
              };
            },
          ) ?? currentComponents,
      );

      return {
        previousComponents,
      };
    },

    onError: (
      _error,
      _input,
      context,
    ) => {
      if (
        context?.previousComponents
      ) {
        queryClient.setQueryData(
          queryKey,
          context.previousComponents,
        );
      }
    },

    onSuccess: (
      updatedComponent,
    ) => {
      queryClient.setQueryData<Component[]>(
        queryKey,
        (currentComponents) =>
          currentComponents?.map(
            (component) =>
              component.id ===
              updatedComponent.id
                ? updatedComponent
                : component,
          ),
      );
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
}
