const { tables } = require('..');

exports.up = async function(knex) {
  await knex.schema.createTable(tables.currency, (table) => {
    table.increments('currency_id').unsigned().notNullable().primary();
    table.string('code', 3).notNullable();
    table.string('name', 50).notNullable();
    table.string('symbol', 50).notNullable();
    
    table.index('currency_id', 'Primary key');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable(tables.currency);
};
