import { Router } from "express";

import { createTemplateController } from "../controllers/create-template.controller.js";
import { deleteTemplateController } from "../controllers/delete-template.controller.js";
import { getTemplateController } from "../controllers/get-template.controller.js";
import { listTemplatesController } from "../controllers/list-templates.controller.js";
import { updateTemplateController } from "../controllers/update-template.controller.js";

export const templateRoutes = Router();

templateRoutes.post(
  "/",
  createTemplateController,
);

templateRoutes.get(
  "/",
  listTemplatesController,
);

templateRoutes.get(
  "/:id",
  getTemplateController,
);

templateRoutes.patch(
  "/:id",
  updateTemplateController,
);

templateRoutes.delete(
  "/:id",
  deleteTemplateController,
);