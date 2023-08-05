const { tables } = require("..");

exports.up = function (knex) {
  return knex.schema.createTable(tables.subscription, function (table) {
    table.increments("subscription_id").unsigned().primary();
    table.text("description");
    table.decimal("price", 10, 2);
    table.string("title", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.subscription);
};
