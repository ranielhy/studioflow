import cors from "cors";
import express from "express";
import helmet from "helmet";

import { errorHandler } from "./middlewares/error-handler.js";
import { routes } from "./routes/index.js";

export const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use("/api", routes);

app.use(errorHandler);