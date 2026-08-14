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

export interface Slice {
  id: number;

  templateId: number;

  name: string;
  position: number;
  duration: number;

  background: SliceBackground;

  createdAt: string;
  updatedAt: string;
}