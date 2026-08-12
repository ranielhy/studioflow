import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import { ZodError } from "zod";

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

  return response.status(500).json({
    error: "internal_server_error",
    message:
      "An internal server error occurred.",
  });
};