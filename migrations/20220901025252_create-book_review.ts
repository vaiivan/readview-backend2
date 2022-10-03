import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("book_review");
    if (!hasTable) {
      await knex.schema.createTable("book_review", (table) => {
        table.increments();
        table.integer("user_id").notNullable;
        table.foreign('user_id').references('users.id');
        table.integer("book_id").notNullable;
        table.foreign('book_id').references('book.id');
        table.text("content").notNullable;
        table.boolean('private').notNullable().defaultTo(true);
        table.boolean('spoiler').notNullable().defaultTo(false);
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("book_review");
}
