import { Router } from "express";

import { deleteBlockController } from "../controllers/delete-block.controller.js";
import { getBlockController } from "../controllers/get-block.controller.js";
import { updateBlockController } from "../controllers/update-block.controller.js";

export const blockRoutes = Router();

blockRoutes.get("/:id", getBlockController);
blockRoutes.patch("/:id", updateBlockController);
blockRoutes.delete("/:id", deleteBlockController);
