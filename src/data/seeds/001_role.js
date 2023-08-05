const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.role).del();

    // Insert
    await knex(tables.role).insert([
      { name: "admin" },
      { name: "customer (enterprise)" },
      { name: "customer (private)" },
    ]);
  },
};
