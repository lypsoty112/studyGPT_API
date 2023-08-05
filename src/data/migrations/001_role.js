const { tables } = require("..");

exports.up = function (knex) {
  return knex.schema.createTable(tables.role, function (table) {
    table.increments("role_id").unsigned().primary();
    table.string("name", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.role);
};
