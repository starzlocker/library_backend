/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('books', table => {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.integer('author_id').unsigned(); // sem foreign key por enquanto
        table.integer('genre_id').unsigned();  // sem foreign key por enquanto
        table.integer('year');
        table.string('cover_url', 255);
        table.text('description');
        table.integer('stock');
        table.decimal('price', 10, 2);
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
