import { Router } from "express";
import { templateRoutes } from "../routes/template.routes";

import { healthRoutes } from "./health.routes.js";

export const routes = Router();

routes.use("/health", healthRoutes);
routes.use("/templates", templateRoutes);