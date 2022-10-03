import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("user_user");
    if (!hasTable) {
      await knex.schema.createTable("user_user", (table) => {
        table.increments();
        table.integer("to_be_followed_user_id").notNullable;
        table.foreign('to_be_followed_user_id').references('users.id');
        table.integer("follower_user_id").notNullable;
        table.foreign('follower_user_id').references('users.id');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_user");
}
