import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("discussion");
    if (!hasTable) {
      await knex.schema.createTable("discussion", (table) => {
        table.increments();
        table.integer("user_id").notNullable;
        table.foreign('user_id').references('users.id');
        table.text('title').notNullable;
        table.text('info').notNullable;
        table.boolean('active').notNullable().defaultTo(true)
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("discussion");
}
