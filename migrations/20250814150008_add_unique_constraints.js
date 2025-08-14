/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('authors', table => {
      table.unique('name');
    }),
    knex.schema.alterTable('genres', table => {
      table.unique('name');
    }),
    knex.schema.alterTable('books', table => {
      table.unique('title');
    })
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return Promise.all([
    knex.schema.alterTable('authors', table => {
      table.dropUnique('name');
    }),
    knex.schema.alterTable('genres', table => {
      table.dropUnique('name');
    }),
    knex.schema.alterTable('books', table => {
      table.dropUnique('title');
    })
  ]);
};
