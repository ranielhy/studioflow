import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.error(error);

  return response.status(500).json({
    error: "internal_server_error",
    message: "Ocorreu um erro interno no servidor.",
  });
};