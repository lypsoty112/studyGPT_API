const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.status).delete();

    // Insert
    await knex(tables.status).insert([
      { status_id: 1, name: 'Status 1' },
      { status_id: 2, name: 'Status 2' },
    ]);
  },
};
