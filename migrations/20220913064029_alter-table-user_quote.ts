import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("user_quote");
    if (hasTable) {
      await knex.schema.alterTable("user_quote", (table) => {
        table.boolean('like').notNullable().defaultTo(true)
        
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("user_quote", (table) => {
        table.dropColumn('like')
    });
}
