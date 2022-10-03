import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("book");
    if (!hasTable) {
      await knex.schema.createTable("book", (table) => {
        table.increments();
        table.text("title").notNullable;
        table.date("publish_date");
        table.integer('isbn').notNullable;
        table.text('book_picture').notNullable;
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("book");
}

