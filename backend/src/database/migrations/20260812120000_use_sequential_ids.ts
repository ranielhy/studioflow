import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("templates", (table) => {
    table.increments("id_new", { primaryKey: false });
  });
  await knex.schema.alterTable("slices", (table) => {
    table.increments("id_new", { primaryKey: false });
    table.integer("template_id_new");
  });
  await knex.schema.alterTable("components", (table) => {
    table.increments("id_new", { primaryKey: false });
    table.integer("slice_id_new");
  });
  await knex.schema.alterTable("blocks", (table) => {
    table.increments("id_new", { primaryKey: false });
    table.integer("component_id_new");
  });

  await knex.raw(`
    UPDATE slices
    SET template_id_new = templates.id_new
    FROM templates
    WHERE slices.template_id = templates.id
  `);
  await knex.raw(`
    UPDATE components
    SET slice_id_new = slices.id_new
    FROM slices
    WHERE components.slice_id = slices.id
  `);
  await knex.raw(`
    UPDATE blocks
    SET component_id_new = components.id_new
    FROM components
    WHERE blocks.component_id = components.id
  `);

  await knex.schema.alterTable("blocks", (table) => {
    table.dropForeign("component_id");
    table.dropUnique(["component_id"]);
    table.dropPrimary();
    table.dropColumn("component_id");
    table.dropColumn("id");
  });
  await knex.schema.alterTable("components", (table) => {
    table.dropForeign("slice_id");
    table.dropPrimary();
    table.dropColumn("slice_id");
    table.dropColumn("id");
  });
  await knex.schema.alterTable("slices", (table) => {
    table.dropForeign("template_id");
    table.dropPrimary();
    table.dropColumn("template_id");
    table.dropColumn("id");
  });
  await knex.schema.alterTable("templates", (table) => {
    table.dropPrimary();
    table.dropColumn("id");
  });

  await knex.schema.alterTable("templates", (table) => {
    table.renameColumn("id_new", "id");
    table.primary(["id"]);
  });
  await knex.schema.alterTable("slices", (table) => {
    table.renameColumn("id_new", "id");
    table.renameColumn("template_id_new", "template_id");
    table.primary(["id"]);
    table.foreign("template_id").references("templates.id").onDelete("CASCADE");
  });
  await knex.schema.alterTable("components", (table) => {
    table.renameColumn("id_new", "id");
    table.renameColumn("slice_id_new", "slice_id");
    table.primary(["id"]);
    table.foreign("slice_id").references("slices.id").onDelete("CASCADE");
  });
  await knex.schema.alterTable("blocks", (table) => {
    table.renameColumn("id_new", "id");
    table.renameColumn("component_id_new", "component_id");
    table.primary(["id"]);
    table.unique(["component_id"]);
    table.foreign("component_id").references("components.id").onDelete("CASCADE");
  });

  await knex.schema.alterTable("slices", (table) => {
    table.integer("template_id").notNullable().alter();
  });
  await knex.schema.alterTable("components", (table) => {
    table.integer("slice_id").notNullable().alter();
  });
  await knex.schema.alterTable("blocks", (table) => {
    table.integer("component_id").notNullable().alter();
  });
}

export async function down(): Promise<void> {
  throw new Error("Sequential ID migration cannot be safely reversed");
}
