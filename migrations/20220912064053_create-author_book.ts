import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("author_book");
    if (!hasTable) {
      await knex.schema.createTable("author_book", (table) => {
        table.increments();
        table.integer("author_id").notNullable;
        table.foreign('author_id').references('author.id');
        table.integer("book_id").notNullable;
        table.foreign('book_id').references('book.id');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("author_book");
}