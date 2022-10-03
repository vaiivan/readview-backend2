import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("booklist_book");
    if (!hasTable) {
      await knex.schema.createTable("booklist_book", (table) => {
        table.increments();
        table.integer("booklist_id").notNullable;
        table.foreign('booklist_id').references('booklist.id');
        table.integer("book_id").notNullable;
        table.foreign('book_id').references('book.id');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("booklist_book");
}
