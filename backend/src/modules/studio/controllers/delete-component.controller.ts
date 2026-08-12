import type { NextFunction, Request, Response } from "express";
import { deleteComponent } from "../repositories/component.repository.js";

export async function deleteComponentController(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) return response.status(400).json({ error: "invalid_component_id", message: "Component id must be a positive integer" });
    if (!(await deleteComponent(id))) return response.status(404).json({ error: "component_not_found", message: "Component not found" });
    return response.status(204).send();
  } catch (error) { next(error); }
}
