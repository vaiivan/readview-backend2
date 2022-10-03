import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("user_quote");
    if (!hasTable) {
      await knex.schema.createTable("user_quote", (table) => {
        table.increments();
        table.integer("user_id").notNullable;
        table.foreign('user_id').references('users.id');
        table.integer("book_quote_id").notNullable;
        table.foreign('book_quote_id').references('book_quote.id');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_quote");
}
