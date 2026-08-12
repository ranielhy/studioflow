import { Router } from "express";

import { deleteSliceController } from "../controllers/delete-slice.controller.js";
import { getSliceController } from "../controllers/get-slice.controller.js";
import { updateSliceController } from "../controllers/update-slice.controller.js";

export const sliceRoutes = Router();

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