import { Router } from "express";

import { templateRoutes } from "./template.routes.js";

export const studioRoutes = Router();

studioRoutes.use(
  "/templates",
  templateRoutes,
);