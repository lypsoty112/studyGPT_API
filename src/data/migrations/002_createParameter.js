const { tables } = require('..');

exports.up = async function(knex) {
  await knex.schema.createTable(tables.parameter, (table) => {
    table.increments('parameter_id').unsigned().notNullable().primary();
    table.string('name', 150).notNullable();
    table.boolean('default').notNullable().defaultTo(false);
    
    table.index('parameter_id', 'Primary key');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable(tables.parameter);
};
