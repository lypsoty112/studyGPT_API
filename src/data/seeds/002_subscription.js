const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.subscription).del();

    // Insert
    await knex(tables.subscription).insert([
      {
        description: "Free subscription with limited features",
        price: 0.0,
        title: "Free",
      },
      {
        description: "Premium subscription with full access",
        price: 9.99,
        title: "Premium",
      },
      {
        description: "Basic subscription with limited features",
        price: 4.99,
        title: "Basic",
      },
    ]);
  },
};
