const { tables } = require('..');

exports.up = async function(knex) {
  await knex.schema.createTable(tables.summary, (table) => {
    table.increments('summary_id').unsigned().notNullable().primary();
    table.integer('user_id').unsigned().notNullable();
    table.date('date_created').notNullable();
    table.date('date_modified').notNullable();
    table.binary('content').notNullable();
    table.string('name', 255).notNullable();
    table.text('description');
    
    table.index('summary_id', 'Primary key');
    
    table.foreign('user_id').references(`${tables.user}.user_id`);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable(tables.summary);
};
