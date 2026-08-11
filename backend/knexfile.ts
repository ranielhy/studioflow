import type { Knex } from "knex";

import { env } from "./src/config/env.ts";

const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",

    connection: {
      host: env.database.host,
      port: env.database.port,
      database: env.database.name,
      user: env.database.user,
      password: env.database.password,
    },

    migrations: {
      directory: "./src/database/migrations",
      extension: "ts",
    },

    seeds: {
      directory: "./src/database/seeds",
      extension: "ts",
    },
  },
};

export default config;
