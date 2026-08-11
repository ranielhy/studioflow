import type { Component } from "./component";

export type SliceBackground =
  | {
      type: "COLOR";
      value: string;
    }
  | {
      type: "IMAGE";
      src: string;
    }
  | {
      type: "VIDEO";
      src: string;
    };

export interface CreateSliceInput {
  name: string;
  position: number;
  duration: number;
  background: SliceBackground;
  components: Component[];
}

export interface Slice {
  name: string;
  position: number;
  duration: number;
  background: SliceBackground;
  components: Component[];
}

export function createSlice(input: CreateSliceInput): Slice {
  if (input.position < 0) {
    throw new Error(
      "Slice position cannot be negative"
    );
  }

  if (input.duration <= 0) {
    throw new Error(
      "Slice duration must be greater than zero"
    );
  }

  for (const component of input.components) {
    if (
      component.endTime !== null &&
      component.endTime > input.duration
    ) {
      throw new Error(
        "Component endTime cannot exceed slice duration"
      );
    }
  }

  return {
    ...input,
  };
}
