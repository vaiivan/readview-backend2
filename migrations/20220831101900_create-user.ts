import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable("users");
    if (!hasTable) {
      await knex.schema.createTable("users", (table) => {
        table.increments();
        table.text("username").notNullable;
        table.text("email").notNullable;
        table.text("password").notNullable;
        table.text("gender").notNullable().defaultTo('not provided');
        table.date('birthday');
        table.text('profile_picture').defaultTo('default_profile_picture.jpg')
        table.text('info').defaultTo('I am now on readview~')
        table.integer('level').notNullable().defaultTo(0)
        table.timestamps(false, true);
      });
    } 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
}

