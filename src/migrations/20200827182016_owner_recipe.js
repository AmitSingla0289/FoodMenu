
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tbowner_recipe', function (table) {
    table.increments('owner_recie_id').primary();
    table.integer('owner_id1').unsigned().references('owner_id').inTable('tbowner').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('recipe_id1').unsigned().references('recipe_id').inTable('tbrecipe').onDelete('CASCADE').onUpdate('CASCADE');
    table.float('price').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tbowner_recipe');
};
