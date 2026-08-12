import type { Knex } from "knex";

// Kept as an empty migration because it may already be registered in existing
// databases. Sequential IDs are introduced by the following migration.
export async function up(_knex: Knex): Promise<void> {}

export async function down(_knex: Knex): Promise<void> {}
