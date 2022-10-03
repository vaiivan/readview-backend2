import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("book");
    if (hasTable) {
      await knex.schema.alterTable("book", (table) => {
        table.integer('pages')
        
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("book", (table) => {
        table.dropColumn('pages')
    });
}
