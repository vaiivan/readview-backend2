import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("genre");
    if (!hasTable) {
      await knex.schema.createTable("genre", (table) => {
        table.increments();
        table.text("genre_name").notNullable;
        table.text('fiction_type').notNullable;
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("genre");
}

