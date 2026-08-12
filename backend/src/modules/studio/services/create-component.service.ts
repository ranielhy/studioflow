import { AppError } from "../../../errors/app-error.js";

import { createComponent as createComponentDomain } from "../domain/component.js";

import { findSliceById } from "../repositories/slice.repository.js";

import {
  createComponent as createComponentRepository,
  type ComponentRow,
} from "../repositories/component.repository.js";

export interface CreateComponentServiceInput {
  sliceId: number;

  name: string;

  position: {
    x: number;
    y: number;
  };

  size: {
    width: number;
    height: number;
  };

  rotation: number;
  opacity: number;

  startTime: number;
  endTime: number | null;

  zIndex: number;

  visible: boolean;
  locked: boolean;
  editable: boolean;
}

export async function createComponentService(
  input: CreateComponentServiceInput,
): Promise<ComponentRow> {
  const slice = await findSliceById(input.sliceId);

  if (!slice) {
    throw new AppError(
      "Slice not found",
      404,
      "slice_not_found",
    );
  }

  if (
    input.endTime !== null &&
    input.endTime > slice.duration
  ) {
    throw new AppError(
      "Component endTime cannot exceed slice duration",
      400,
      "component_duration_invalid",
    );
  }

  const component = createComponentDomain({
    name: input.name,

    position: input.position,
    size: input.size,

    startTime: input.startTime,
    endTime: input.endTime,

    rotation: input.rotation,
    opacity: input.opacity,

    zIndex: input.zIndex,

    visible: input.visible,
    locked: input.locked,
    editable: input.editable,

    // temporário até criarmos o Block junto
    block: {
      type: "TEXT",
      properties: {
        text: "",
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#000000",
      },
    },
  });

  return createComponentRepository({
    sliceId: input.sliceId,

    name: component.name,

    x: component.position.x,
    y: component.position.y,

    width: component.size.width,
    height: component.size.height,

    rotation: component.rotation,
    opacity: component.opacity,

    startTime: component.startTime,
    endTime: component.endTime,

    zIndex: component.zIndex,

    visible: component.visible,
    locked: component.locked,
    editable: component.editable,
  });
}