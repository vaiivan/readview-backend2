import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("user_follow_booklist");
    if (!hasTable) {
      await knex.schema.createTable("user_follow_booklist", (table) => {
        table.increments();
        table.integer("user_id").notNullable;
        table.foreign('user_id').references('users.id');
        table.integer("follow_booklist_id").notNullable;
        table.foreign('follow_booklist_id').references('booklist.id');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_follow_booklist");
}
