import { Router } from "express";

import { deleteSliceController } from "../controllers/delete-slice.controller.js";
import { getSliceController } from "../controllers/get-slice.controller.js";
import { updateSliceController } from "../controllers/update-slice.controller.js";
import { componentRoutes } from "./component.routes.js";

export const sliceRoutes = Router();

sliceRoutes.use(
  "/:sliceId/components",
  componentRoutes,
);

sliceRoutes.get(
  "/:id",
  getSliceController,
);

sliceRoutes.patch(
  "/:id",
  updateSliceController,
);

sliceRoutes.delete(
  "/:id",
  deleteSliceController,
);
