const { tables } = require("..");

exports.up = function (knex) {
  return knex.schema.createTable(tables.parameter, function (table) {
    table.increments("parameter_id").unsigned().primary();
    table.integer("class_id").unsigned();
    table.string("name", 255);
    table.text("description").defaultTo("");
    table.text("prompt").defaultTo("");
    table.integer("implemented").defaultTo(0); // 0 = not implemented, 1 = implemented
    table.integer("premium").defaultTo(0); // 0 = not premium, 1 = premium
    table.foreign("class_id").references(`${tables.parameterClass}.class_id`);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.parameter);
};
