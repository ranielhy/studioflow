import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("templates", (table) => {
    table.increments("id").primary();

    table.string("name", 150).notNullable();

    table.text("description");

    table.string("media_type", 20).notNullable();

    table.string("status", 20).notNullable().defaultTo("DRAFT");

    table.integer("width").notNullable();

    table.integer("height").notNullable();

    table.timestamps(true, true);
  });
  
  await knex.schema.createTable("slices", (table) => {
  table.increments("id").primary();

  table
    .integer("template_id")
    .notNullable()
    .references("id")
    .inTable("templates")
    .onDelete("CASCADE");

  table.string("name", 150).notNullable();

  table.integer("position").notNullable();

  table.decimal("duration", 12, 3);

  table.jsonb("background").notNullable().defaultTo("{}");

  table.timestamps(true, true);
});

await knex.schema.createTable("components", (table) => {
  table.increments("id").primary();

  table
    .integer("slice_id")
    .notNullable()
    .references("id")
    .inTable("slices")
    .onDelete("CASCADE");

  table.string("name", 150).notNullable();

  table.decimal("x", 12, 3).notNullable().defaultTo(0);

  table.decimal("y", 12, 3).notNullable().defaultTo(0);

  table.decimal("width", 12, 3).notNullable();

  table.decimal("height", 12, 3).notNullable();

  table.decimal("rotation", 8, 3).notNullable().defaultTo(0);

  table.decimal("opacity", 5, 2).notNullable().defaultTo(100);

  table.decimal("start_time", 12, 3).notNullable().defaultTo(0);

  table.decimal("end_time", 12, 3);

  table.integer("z_index").notNullable().defaultTo(0);

  table.boolean("visible").notNullable().defaultTo(true);

  table.boolean("locked").notNullable().defaultTo(false);

  table.boolean("editable").notNullable().defaultTo(true);

  table.timestamps(true, true);
});

await knex.schema.createTable("blocks", (table) => {
  table.increments("id").primary();

  table
    .integer("component_id")
    .notNullable()
    .unique()
    .references("id")
    .inTable("components")
    .onDelete("CASCADE");

  table.string("type", 30).notNullable();

  table.jsonb("properties").notNullable().defaultTo("{}");

  table.timestamps(true, true);
});

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("blocks");

  await knex.schema.dropTableIfExists("components");

  await knex.schema.dropTableIfExists("slices");

  await knex.schema.dropTableIfExists("templates");
}
