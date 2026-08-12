import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import { ZodError } from "zod";
import { AppError } from "../errors/app-error.js";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return response.status(400).json({
      error: "validation_error",

      message: "Invalid request data",

      issues: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  console.error(error);
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error: error.code,
      message: error.message,
    });
  }
  
  return response.status(500).json({
    error: "internal_server_error",
    message:
      "An internal server error occurred.",
  });
};