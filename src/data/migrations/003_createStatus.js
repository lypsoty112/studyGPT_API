const { tables } = require('..');

exports.up = async function(knex) {
  await knex.schema.createTable(tables.status, (table) => {
    table.increments('status_id').unsigned().notNullable().primary();
    table.string('name', 50).notNullable();
    
    table.index('status_id', 'Primary key')
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable(tables.status);
};
