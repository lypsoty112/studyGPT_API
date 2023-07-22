const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.parameter).delete();

    // Insert
    await knex(tables.parameter).insert([
      { parameter_id: 1, name: 'Parameter 1', default: true },
      { parameter_id: 2, name: 'Parameter 2', default: false },
    ]);
  },
};
