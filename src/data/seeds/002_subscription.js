const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.subscription).del();

    // Insert
    await knex(tables.subscription).insert([
      {
        subscription_id: 1,
        description: "Free subscription with limited features",
        price: 0.0,
        title: "Free",
      },
      {
        subscription_id: 2,
        description: "Premium subscription with full access",
        price: 9.99,
        title: "Premium",
      },
      {
        subscription_id: 3,
        description: "Basic subscription with limited features",
        price: 4.99,
        title: "Basic",
      },
    ]);
  },
};
