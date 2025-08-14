/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('books', table => {
    table.foreign('author_id').references('id').inTable('authors').onDelete('SET NULL');
    table.foreign('genre_id').references('id').inTable('genres').onDelete('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('books', table => {
    table.dropForeign('author_id');
    table.dropForeign('genre_id');
  });
};
