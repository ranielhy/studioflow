export type MediaType =
  | "IMAGE"
  | "VIDEO"
  | "PDF";

export type TemplateStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export interface Template {
  id: number;

  name: string;
  description: string | null;

  mediaType: MediaType;
  status: TemplateStatus;

  width: number;
  height: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateInput {
  name: string;
  description?: string;

  mediaType: MediaType;
  status: TemplateStatus;

  width: number;
  height: number;
}