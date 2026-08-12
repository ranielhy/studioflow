import { Router } from "express";

import { createBlockController } from "../controllers/create-block.controller.js";
import { createComponentController } from "../controllers/create-component.controller.js";
import { deleteComponentController } from "../controllers/delete-component.controller.js";
import { getComponentBlockController } from "../controllers/get-component-block.controller.js";
import { getComponentController } from "../controllers/get-component.controller.js";
import { listComponentsController } from "../controllers/list-components.controller.js";
import { updateComponentController } from "../controllers/update-component.controller.js";

export const sliceComponentRoutes = Router({ mergeParams: true });

sliceComponentRoutes.post("/", createComponentController);
sliceComponentRoutes.get("/", listComponentsController);

export const componentRoutes = Router();

componentRoutes.post("/:componentId/block", createBlockController);
componentRoutes.get("/:componentId/block", getComponentBlockController);
componentRoutes.get("/:id", getComponentController);
componentRoutes.patch("/:id", updateComponentController);
componentRoutes.delete("/:id", deleteComponentController);
