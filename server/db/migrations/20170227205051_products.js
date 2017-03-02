exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', (table) => {
        table.increments();
        table.string('name').notNullable().unique();
        table.double('price').notNullable();
        table.text('description');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products');
};
