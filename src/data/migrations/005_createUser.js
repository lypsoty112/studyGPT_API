const { tables } = require("..");

exports.up = async function (knex) {
  await knex.schema.createTable(tables.user, (table) => {
    table.increments("user_id").unsigned().notNullable().primary();
    table.integer("subscription_id").unsigned().notNullable();
    table.string("email", 150).notNullable();
    table.string("auth0id", 255).notNullable();
    table.string("password", 255).default(null);
    table.date("registration_date").notNullable();

    table.index("user_id", "Primary key");

    table
      .foreign("subscription_id")
      .references(`${tables.subscription}.subscription_id`);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable(tables.user);
};
