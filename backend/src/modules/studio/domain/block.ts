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

export interface BlockPropertiesMap {
  TEXT: TextBlockProperties;
  IMAGE: ImageBlockProperties;
  VIDEO: VideoBlockProperties;
}

export interface Block<T extends BlockType = BlockType> {
  type: T;
  properties: BlockPropertiesMap[T];
}

interface CreateBlockInput<T extends BlockType> {
  type: T;
  properties: BlockPropertiesMap[T];
}

export function createBlock<T extends BlockType>(
  input: CreateBlockInput<T>
): Block<T> {
  return {
    type: input.type,
    properties: input.properties
  };
}
