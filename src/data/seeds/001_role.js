const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.role).del();

    // Insert
    await knex(tables.role).insert([
      { role_id: 1, name: "admin" },
      { role_id: 2, name: "customer (enterprise)" },
      { role_id: 3, name: "customer (private)" },
    ]);
  },
};
