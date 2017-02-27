exports.up = function(knex, Promise) {
    return knex.schema.createTable('settings', (table) => {
        table.string('company_name').notNullable();
        table.string('registration_nr').notNullable();
        table.string('address').notNullable();
        table.string('city').notNullable();
        table.string('country').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('settings');
};
