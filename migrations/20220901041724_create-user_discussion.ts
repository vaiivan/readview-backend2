import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("user_discussion");
    if (!hasTable) {
      await knex.schema.createTable("user_discussion", (table) => {
        table.increments();
        table.integer("discussion_id").notNullable;
        table.foreign('discussion_id').references('discussion.id');
        table.integer("user_id").notNullable;
        table.foreign('user_id').references('users.id');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_discussion");
}

