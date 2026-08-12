import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("slices", (table) => {
    table.unique(
      ["template_id", "position"],
      {
        indexName: "slices_template_position_unique",
      },
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("slices", (table) => {
    table.dropUnique(
      ["template_id", "position"],
      "slices_template_position_unique",
    );
  });
}