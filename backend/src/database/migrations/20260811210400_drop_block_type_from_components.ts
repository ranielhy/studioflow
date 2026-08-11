import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  const hasBlockType = await knex.schema.hasColumn(
    "components",
    "block_type",
  );

  if (hasBlockType) {
    await knex.schema.alterTable("components", (table) => {
      table.dropColumn("block_type");
    });
  }
}


export async function down(knex: Knex): Promise<void> {
  const hasBlockType = await knex.schema.hasColumn(
    "components",
    "block_type",
  );

  if (!hasBlockType) {
    await knex.schema.alterTable("components", (table) => {
      table.string("block_type", 30).notNullable();
    });
  }
}
