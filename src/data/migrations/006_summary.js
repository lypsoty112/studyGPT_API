const { tables } = require("..");

exports.up = function (knex) {
  return knex.schema.createTable(tables.summary, function (table) {
    table.increments("summary_id").unsigned().primary();
    table.text("content");
    table.dateTime("date_created");
    table.dateTime("date_modified");
    table.text("description");
    table.string("title", 255);
    table.integer("user_id").unsigned();
    table.foreign("user_id").references(`${tables.user}.user_id`);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.summary);
};
