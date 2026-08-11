import type {
  Block,
} from "./block";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface CreateComponentInput {
  name: string;

  position: Position;
  size: Size;

  startTime: number;
  endTime: number | null;

  rotation: number;
  opacity: number;

  zIndex: number;

  visible: boolean;
  locked: boolean;
  editable: boolean;

  block: Block;
}

export interface Component {
  name: string;

  position: Position;
  size: Size;

  startTime: number;
  endTime: number | null;

  rotation: number;
  opacity: number;

  zIndex: number;

  visible: boolean;
  locked: boolean;
  editable: boolean;

  block: Block;
}

export function createComponent(
  input: CreateComponentInput
): Component {
  if (input.size.width <= 0) {
    throw new Error(
      "Component width must be greater than zero"
    );
  }

  if (input.size.height <= 0) {
    throw new Error(
      "Component height must be greater than zero"
    );
  }

  if (input.opacity < 0 || input.opacity > 100) {
    throw new Error(
      "Component opacity must be between 0 and 100"
    );
  }

  if (input.startTime < 0) {
    throw new Error(
      "Component startTime cannot be negative"
    );
  }

  if (
    input.endTime !== null &&
    input.endTime < input.startTime
  ) {
    throw new Error(
      "Component endTime cannot be before startTime"
    );
  }

  return {
    ...input,

    block: {
      type: input.block.type,
      properties: input.block.properties
    }
  };
}
