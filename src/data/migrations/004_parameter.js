const { tables } = require("..");

exports.up = function (knex) {
  return knex.schema.createTable(tables.parameter, function (table) {
    table.increments("parameter_id").unsigned().primary();
    table.text("command");
    table.text("description");
    table.string("name", 255);
    table.integer("parameter_class_id").unsigned();
    table
      .foreign("parameter_class_id")
      .references(`${tables.parameterClass}.parameter_class_id`);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.parameter);
};
