import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("discussion_comment");
    if (!hasTable) {
      await knex.schema.createTable("discussion_comment", (table) => {
        table.increments();
        table.integer("discussion_id").notNullable;
        table.foreign('discussion_id').references('discussion.id');
        table.integer("user_id").notNullable;
        table.foreign('user_id').references('users.id');
        table.text('content').notNullable;
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("discussion_comment");
}

