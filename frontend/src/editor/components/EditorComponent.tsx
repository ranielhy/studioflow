import { Rnd } from "react-rnd";

import type {
  Component,
  UpdateComponentInput,
} from "../../types/component";

import { BlockRenderer } from "../blocks/BlockRenderer";

interface EditorComponentProps {
  component: Component;
  onUpdateComponent: (
    input: UpdateComponentInput,
  ) => void;
}

export function EditorComponent({
  component,
  onUpdateComponent,
}: EditorComponentProps) {
  return (
    <Rnd
      position={{
        x: component.position.x,
        y: component.position.y,
      }}

      size={{
        width: component.size.width,
        height: component.size.height,
      }}

      bounds="parent"

      disableDragging={
        component.locked
      }

      enableResizing={
        !component.locked
      }

      style={{
        zIndex: component.zIndex,

        opacity:
          component.opacity / 100,

        transform: `rotate(${component.rotation}deg)`,

        border:
          "1px dashed rgba(255, 254, 254, 0.35)",
      }}

      onDragStop={(_event, data) => {
        onUpdateComponent({
          id: component.id,
          position: {
            x: data.x,
            y: data.y,
          },
        });
      }}

      onResizeStop={(
        _event,
        _direction,
        ref,
        _delta,
        position,
      ) => {
        onUpdateComponent({
          id: component.id,
          position: {
            x: position.x,
            y: position.y,
          },
          size: {
            width:
              ref.offsetWidth,

            height:
              ref.offsetHeight,
          },
        });
      }}
    >
      <BlockRenderer
        component={component}
      />
    </Rnd>
  );
}
