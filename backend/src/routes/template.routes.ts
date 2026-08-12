import { Router } from "express";

import { createTemplateController } from "../modules/studio/controllers/create-template.controller";

export const templateRoutes = Router();

templateRoutes.post(
  "/",
  createTemplateController,
);
