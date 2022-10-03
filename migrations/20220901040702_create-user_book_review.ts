import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("user_book_review");
    if (!hasTable) {
      await knex.schema.createTable("user_book_review", (table) => {
        table.increments();
        table.integer("user_id").notNullable;
        table.foreign('user_id').references('users.id');
        table.integer("book_review_id").notNullable;
        table.foreign('book_review_id').references('book_review.id');
        table.boolean('like').notNullable;
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_book_review");
}

