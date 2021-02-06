import * as Knex from "knex";

const TABLE_NAME = 'users'

export async function up(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable(TABLE_NAME)

    if (!hasTable) {
        return knex.schema.createTable(TABLE_NAME, function(table) {
            table.increments();
            table.string('title');
            table.text('description');
            table.dateTime('start_date');
            table.dateTime('due_date');
            table.timestamps();
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists(TABLE_NAME)
}

