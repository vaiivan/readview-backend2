import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("user_genre");
    if (!hasTable) {
      await knex.schema.createTable("user_genre", (table) => {
        table.increments();
        table.integer("user_id").notNullable;
        table.foreign('user_id').references('users.id');
        table.integer("genre_id").notNullable;
        table.foreign('genre_id').references('genre.id');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_genre");
}

