import { Router } from "express";

import { studioRoutes } from "../modules/studio/routes/index.js";
import { healthRoutes } from "./health.routes.js";

export const routes = Router();

routes.use("/health", healthRoutes);
routes.use(studioRoutes);
