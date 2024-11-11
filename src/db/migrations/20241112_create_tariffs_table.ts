/**
 * Миграция для создания таблицы tariffs.
 * Таблица будет хранить данные о тарифах, обновляемые раз в час.
 */
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tariffs", (table) => {
    table.increments("id").primary();
    table.date("date").notNullable();
    table.integer("coefficient").notNullable();
    table.string("warehouse").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tariffs");
}
