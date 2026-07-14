import knex from "knex";

import { env } from "../config/env.js";

export const database = knex({
  client: "pg",

  connection: {
    host: env.database.host,
    port: env.database.port,
    database: env.database.name,
    user: env.database.user,
    password: env.database.password,
  },

  pool: {
    min: 2,
    max: 10,
  },
});