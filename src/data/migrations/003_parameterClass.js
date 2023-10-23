const { tables } = require("..");

exports.up = function (knex) {
  return knex.schema.createTable(tables.parameterClass, function (table) {
    table.increments("class_id").unsigned().primary();
    table.string("name", 255);
    table.text("description").defaultTo("");
    table.text("prompt").defaultTo("");
    table.integer("selection_type"); // 0 = single, 1 = multiple
    table.integer("implemented").defaultTo(0); // 0 = not implemented, 1 = implemented
    table.integer("allow_empty"); // 0 = not allowed, 1 = allowed
    table.integer("premium").defaultTo(0); // 0 = not premium, 1 = premium
    table.integer("position").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.parameterClass);
};
