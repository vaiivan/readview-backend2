import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("publisher");
    if (!hasTable) {
      await knex.schema.createTable("publisher", (table) => {
        table.increments();
        table.text("publisher_name").notNullable;
        table.text('info');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("publisher");
}
