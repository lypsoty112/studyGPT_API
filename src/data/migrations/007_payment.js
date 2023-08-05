const { tables } = require("..");

exports.up = function (knex) {
  return knex.schema.createTable(tables.payment, function (table) {
    table.string("payment_id", 255).primary();
    table.decimal("amount", 10, 2);
    table.enum("currency", ["USD", "EUR", "GBP"]);
    table.dateTime("payment_date");
    table.enum("payment_status", ["Pending", "Paid", "Failed"]);
    table.integer("subscription_id").unsigned();
    table.integer("user_id").unsigned();
    table
      .foreign("subscription_id")
      .references(`${tables.subscription}.subscription_id`);
    table.foreign("user_id").references(`${tables.user}.user_id`);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.payment);
};
