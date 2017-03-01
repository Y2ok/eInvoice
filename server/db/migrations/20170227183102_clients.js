exports.up = function(knex, Promise) {
    return knex.schema.createTable('clients', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('company_name').notNullable();
        table.string('registration_nr').notNullable();
        table.string('address').notNullable();
        table.string('city').notNullable();
        table.string('country').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('clients');
};
