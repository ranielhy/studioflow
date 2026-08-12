import { Router } from "express";

import { getSliceController } from "../controllers/get-slice.controller.js";

export const sliceRoutes = Router();

sliceRoutes.get(
  "/:id",
  getSliceController,
);