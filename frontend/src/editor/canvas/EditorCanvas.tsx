import {
  Box,
} from "@mui/material";

import type {
  Component,
  UpdateComponentInput,
} from "../../types/component";

import type {
  SliceBackground,
} from "../../types/slice";

import { EditorComponent } from "../components/EditorComponent";

interface EditorCanvasProps {
  width: number;
  height: number;

  background: SliceBackground;

  components: Component[];

  onUpdateComponent: (
    input: UpdateComponentInput,
  ) => void;
}

export function EditorCanvas({
  width,
  height,
  background,
  components,
  onUpdateComponent,
}: EditorCanvasProps) {
  function getBackground() {
    if (
      background.type === "COLOR"
    ) {
      return background.value;
    }

    return "#FFFFFF";
  }

  return (
    <Box
      sx={{
        width,
        height,

        position: "relative",

        background:
          getBackground(),

        overflow: "hidden",

        boxShadow: 3,

        flexShrink: 0,
      }}
    >
      {background.type ===
        "IMAGE" && (
        <img
          src={background.src}
          alt=""
          draggable={false}

          style={{
            position: "absolute",

            width: "100%",
            height: "100%",

            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
      )}

      {components
        .filter(
          (component) =>
            component.visible,
        )
        .map((component) => (
          <EditorComponent
            key={component.id}
            component={component}
            onUpdateComponent={
              onUpdateComponent
            }
          />
        ))}
    </Box>
  );
}
