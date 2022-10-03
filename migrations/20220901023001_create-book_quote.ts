import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("book_quote");
    if (!hasTable) {
      await knex.schema.createTable("book_quote", (table) => {
        table.increments();
        table.integer("user_id").notNullable;
        table.foreign('user_id').references('users.id');
        table.integer("book_id").notNullable;
        table.foreign('book_id').references('book.id');
        table.text('content');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("book_quote");
}


