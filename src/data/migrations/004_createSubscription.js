const { tables } = require('..');

exports.up = async function(knex) {
  await knex.schema.createTable(tables.subscription, (table) => {
    table.increments('subscription_id').unsigned().notNullable().primary();
    table.string('name', 255).notNullable();
    table.float('price').notNullable();
    table.integer('currency_id').unsigned().notNullable();
    table.enum('duration', ['1 week', '2 weeks', '1 month', '2 months', '1 year']).notNullable();
    table.text('description');
    
    table.index('subscription_id', 'Primary key');
    
    table.foreign('currency_id').references(`${tables.currency}.currency_id`);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable(tables.subscription);
};
