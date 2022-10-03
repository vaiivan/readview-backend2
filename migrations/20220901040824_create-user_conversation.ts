import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("user_conversation");
    if (!hasTable) {
      await knex.schema.createTable("user_conversation", (table) => {
        table.increments();
        table.integer("sender_id").notNullable;
        table.foreign('sender_id').references('users.id');
        table.integer("recipient_id").notNullable;
        table.foreign('recipient_id').references('users.id');
        table.text('conversation');
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_conversation");
}

