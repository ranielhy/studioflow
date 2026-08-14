export type BlockType =
  | "TEXT"
  | "IMAGE"
  | "VIDEO";

export interface TextBlockProperties {
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
}

export interface ImageBlockProperties {
  src: string;
  fit: "cover" | "contain";
}

export interface VideoBlockProperties {
  src: string;
  volume: number;
  loop: boolean;
}

export interface Block {
  id: number;

  type: BlockType;

  properties:
    | TextBlockProperties
    | ImageBlockProperties
    | VideoBlockProperties;
}

export interface Component {
  id: number;
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