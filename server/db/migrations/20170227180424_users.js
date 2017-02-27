exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('role').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
