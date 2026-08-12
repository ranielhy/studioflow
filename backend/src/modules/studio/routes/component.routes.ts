import { Router } from "express";

import { createComponentController } from "../controllers/create-component.controller.js";
import { listComponentsController } from "../controllers/list-components.controller.js";

export const componentRoutes = Router({
  mergeParams: true,
});

componentRoutes.post(
  "/",
  createComponentController,
);

componentRoutes.get(
  "/",
  listComponentsController,
);
