import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("book_genre");
    if (!hasTable) {
      await knex.schema.createTable("book_genre", (table) => {
        table.increments();
        table.integer("book_id").notNullable;
        table.foreign('book_id').references('book.id');
        table.integer("genre_id").notNullable;
        table.foreign('genre_id').references('genre.id');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("book_genre");
}

