import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("user_book");
    if (!hasTable) {
      await knex.schema.createTable("user_book", (table) => {
        table.increments();
        table.integer("user_id").notNullable;
        table.foreign('user_id').references('users.id');
        table.integer("book_id").notNullable;
        table.foreign('book_id').references('book.id');
        table.text('reading_status');
        table.integer('rating');
        table.timestamp('created_at');
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_book");
}

