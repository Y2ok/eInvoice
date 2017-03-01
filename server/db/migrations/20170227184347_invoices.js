exports.up = function(knex, Promise) {
    return knex.schema.createTable('invoices', (table) => {
        table.increments();
        table.integer('client_id').notNullable().index().references('id').inTable('clients');
        table.timestamp('creation_date').notNullable();
        table.double('price').notNullable();
        table.double('price_vat').notNullable();
        table.integer('vat').notNullable();
        table.integer('discount').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('invoices');
};
