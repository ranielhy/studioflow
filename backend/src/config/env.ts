import path from "node:path";

import { config as loadEnv } from "dotenv";

loadEnv({ path: path.resolve(process.cwd(), ".env") });
loadEnv({ path: path.resolve(process.cwd(), "..", ".env") });

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`A variável de ambiente ${name} não foi definida.`);
  }

  return value;
}

function getNumberEnv(name: string, defaultValue?: number): number {
  const rawValue = process.env[name];

  if (!rawValue && defaultValue !== undefined) {
    return defaultValue;
  }

  if (!rawValue) {
    throw new Error(`A variável de ambiente ${name} não foi definida.`);
  }

  const parsedValue = Number(rawValue);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`A variável ${name} deve ser um número.`);
  }

  return parsedValue;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  backendPort: getNumberEnv("BACKEND_PORT", 3333),

  database: {
    host: getRequiredEnv("DATABASE_HOST"),
    port: getNumberEnv("DATABASE_PORT", 5432),
    name: getRequiredEnv("POSTGRES_DB"),
    user: getRequiredEnv("POSTGRES_USER"),
    password: getRequiredEnv("POSTGRES_PASSWORD"),
  },
};
