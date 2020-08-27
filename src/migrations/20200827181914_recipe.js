
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tbrecipe', function (table) {
        table.increments('recipe_id').primary();
        table.string('recipe').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tbrecipe');
};
