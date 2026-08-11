import type { Slice } from "./slice";

export type MediaType =
  | "IMAGE"
  | "VIDEO"
  | "PDF";

export type TemplateStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export interface CreateTemplateInput {
  name: string;
  description?: string;

  mediaType: MediaType;
  status: TemplateStatus;

  width: number;
  height: number;

  slices: Slice[];
}

export interface Template {
  name: string;
  description?: string;

  mediaType: MediaType;
  status: TemplateStatus;

  width: number;
  height: number;

  slices: Slice[];
}

export function createTemplate(
  input: CreateTemplateInput,
): Template {
  if (input.width <= 0) {
    throw new Error(
      "Template width must be greater than zero",
    );
  }

  if (input.height <= 0) {
    throw new Error(
      "Template height must be greater than zero",
    );
  }

  const slicePositions = new Set<number>();

  for (const slice of input.slices) {
    if (slicePositions.has(slice.position)) {
      throw new Error(
        "Template cannot have duplicated slice positions",
      );
    }

    slicePositions.add(slice.position);
  }

  return {
    ...input,
  };
}
