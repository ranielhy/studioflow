import type {
  Component,
  ImageBlockProperties,
  TextBlockProperties,
  VideoBlockProperties,
} from "../../types/component";

interface BlockRendererProps {
  component: Component;
}

export function BlockRenderer({
  component,
}: BlockRendererProps) {
  const { block } = component;

  if (block.type === "TEXT") {
    const properties =
      block.properties as TextBlockProperties;

    return (
      <div
        style={{
          width: "100%",
          height: "100%",

          fontFamily:
            properties.fontFamily,

          fontSize:
            properties.fontSize,

          color:
            properties.color,

          overflow: "hidden",
        }}
      >
        {properties.text}
      </div>
    );
  }

  if (block.type === "IMAGE") {
    const properties =
      block.properties as ImageBlockProperties;

    return (
      <img
        src={properties.src}
        alt={component.name}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",

          objectFit:
            properties.fit,

          display: "block",

          pointerEvents: "none",
        }}
      />
    );
  }

  if (block.type === "VIDEO") {
    const properties =
      block.properties as VideoBlockProperties;

    return (
      <video
        src={properties.src}

        muted

        loop={properties.loop}

        style={{
          width: "100%",
          height: "100%",

          objectFit: "cover",

          pointerEvents: "none",
        }}
      />
    );
  }

  return null;
}