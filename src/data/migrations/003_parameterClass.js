const { tables } = require("..");

exports.up = function (knex) {
  return knex.schema.createTable(tables.parameterClass, function (table) {
    table.increments("parameter_class_id").unsigned().primary();
    table.integer("class_selectionType").notNullable();
    table.text("class_command");
    table.text("class_description");
    table.string("class_name", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.parameterClass);
};
