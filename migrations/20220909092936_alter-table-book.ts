import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("book");
    if (hasTable) {
      await knex.schema.alterTable("book", (table) => {
        table.dropColumn('isbn');
      });
      await knex.schema.alterTable("book", (table) => {
        table.text('isbn').notNullable;
      })
    } 
}


export async function down(knex: Knex): Promise<void> {

  await knex.schema.alterTable("book", (table) => {
    table.dropColumn('isbn');
  });

  await knex.schema.alterTable("book", (table) => {
      table.integer('isbn').notNullable
  });
}

