exports.up = function(knex, Promise) {
    return knex.schema.createTable('invoices', (table) => {
        table.increments();
        table.string('client').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('invoices');
};
