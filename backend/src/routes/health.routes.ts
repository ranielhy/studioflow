import { Router } from "express";

import { database } from "../database/connection.js";

export const healthRoutes = Router();

healthRoutes.get("/", async (_request, response, next) => {
  try {
    await database.raw("SELECT 1");

    return response.status(200).json({
      status: "ok",
      application: "StudioFlow Backend API",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});