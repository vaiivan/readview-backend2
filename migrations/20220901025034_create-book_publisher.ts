import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("book_publisher");
    if (!hasTable) {
      await knex.schema.createTable("book_publisher", (table) => {
        table.increments();
        table.integer("book_id").notNullable;
        table.foreign('book_id').references('book.id');
        table.integer("publisher_id").notNullable;
        table.foreign('publisher_id').references('publisher.id');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("book_publisher");
}

