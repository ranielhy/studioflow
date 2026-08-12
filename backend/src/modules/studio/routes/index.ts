import { Router } from "express";

import { createSliceController } from "../controllers/create-slice.controller.js";
import { getSliceController } from "../controllers/get-slice.controller.js";
import { listSlicesController } from "../controllers/list-slices.controller.js";

import { sliceRoutes } from "./slice.routes.js";
import { templateRoutes } from "./template.routes.js";
import { componentRoutes } from "./component.routes.js";
import { blockRoutes } from "./block.routes.js";

export const studioRoutes = Router();

studioRoutes.use(
  "/templates",
  templateRoutes,
);

studioRoutes.post(
  "/templates/:templateId/slices",
  createSliceController,
);

studioRoutes.get(
  "/templates/:templateId/slices",
  listSlicesController,
);

studioRoutes.get(
  "/templates/:templateId/slices/:id",
  getSliceController,
);

studioRoutes.use(
  "/slices",
  sliceRoutes,
);

studioRoutes.use(
  "/components",
  componentRoutes,
);

studioRoutes.use(
  "/blocks",
  blockRoutes,
);
