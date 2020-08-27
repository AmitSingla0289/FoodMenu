
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tbowner', function (table) {
        table.increments('owner_id').primary();
        table.string('name').notNullable();
        table.string('city').notNullable();
        table.integer('age').nullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tbowner');
};
