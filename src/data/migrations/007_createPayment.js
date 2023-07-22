const { tables } = require('..');

exports.up = async function(knex) {
  await knex.schema.createTable(tables.payment, (table) => {
    table.increments('payment_id').unsigned().notNullable().primary();
    table.integer('subscription_id').unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.datetime('date').notNullable();
    table.float('amount').notNullable();
    table.integer('currency_id').unsigned().notNullable();
    table.integer('status_id').unsigned().notNullable();
    table.longtext('description');
    
    table.index('payment_id', 'Primary key');

    table.foreign('subscription_id').references(`${tables.subscription}.subscription_id`);
    table.foreign('user_id').references(`${tables.user}.user_id`);
    table.foreign('currency_id').references(`${tables.currency}.currency_id`);
    table.foreign('status_id').references(`${tables.status}.status_id`);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable(tables.payment);
};
