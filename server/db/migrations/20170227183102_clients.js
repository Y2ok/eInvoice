exports.up = function(knex, Promise) {
    return knex.schema.createTable('clients', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('company_name').notNullable().unique();
        table.string('registration_nr').notNullable().unique();
        table.string('address').notNullable();
        table.string('city').notNullable();
        table.string('zip').notNullable();
        table.string('country').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('clients');
};
