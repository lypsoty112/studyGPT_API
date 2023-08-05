const { tables } = require("..");

exports.up = function (knex) {
  return knex.schema.createTable(tables.parameterClass, function (table) {
    table.increments("parameter_class_id").unsigned().primary();
    table.text("command");
    table.text("description");
    table.string("name", 255);
    table.string("selectionType", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.parameterClass);
};
