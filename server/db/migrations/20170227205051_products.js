exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.double('price').notNullable();
        table.text('description').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products');
};
