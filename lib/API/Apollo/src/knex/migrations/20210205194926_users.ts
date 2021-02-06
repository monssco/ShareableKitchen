import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {

    const hasTable = await knex.schema.hasTable('todos')

    if (!hasTable) {
        return knex.schema.createTable('todos', function(table) {
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
    return knex.schema.dropTableIfExists('todos')
}

