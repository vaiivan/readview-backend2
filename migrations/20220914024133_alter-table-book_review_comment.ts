import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("book_review_comment");
    if (hasTable) {
      await knex.schema.alterTable("book_review_comment", (table) => {
        table.boolean('active').notNullable().defaultTo(true)
        
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("book_review_comment", (table) => {
        table.dropColumn('active')
    });
}
