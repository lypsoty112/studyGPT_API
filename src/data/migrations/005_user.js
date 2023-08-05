const { tables } = require("..");

exports.up = function (knex) {
  return knex.schema.createTable(tables.user, function (table) {
    table.increments("user_id").unsigned().primary();
    table.dateTime("date_created");
    table.string("email", 255).unique();
    table.string("password", 255);
    table.integer("role_id").unsigned();
    table.integer("subscription_id").unsigned();
    table.foreign("role_id").references("Role.role_id");
    table
      .foreign("subscription_id")
      .references(`${tables.subscription}.subscription_id`);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.user);
};
