exports.up = function(knex, Promise) {
    return knex.schema.createTable('invoice_products', (table) => {
        table.increments();
        table.integer('invoice_id').notNullable().index().references('id').inTable('invoices');
        table.integer('product_id').notNullable().index().references('id').inTable('products');
        table.integer('quantity').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('invoice_products');
};
