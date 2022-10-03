import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("booklist");
    if (!hasTable) {
      await knex.schema.createTable("booklist", (table) => {
        table.increments();
        table.text('title').notNullable;
        table.integer("booklist_creator_id").notNullable;
        table.foreign('booklist_creator_id').references('users.id');
        table.boolean('private').notNullable().defaultTo(true)
        table.boolean('active').notNullable().defaultTo(true)
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("booklist");
}
