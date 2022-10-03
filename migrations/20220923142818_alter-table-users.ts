import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("users");
    if (hasTable) {
      await knex.schema.alterTable("users", (table) => {
        table.string('location')
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", (table) => {
        table.dropColumn('location')
    });
}