const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.subscription).delete();

    // Insert
    await knex(tables.subscription).insert([
      {
        subscription_id: 1,
        name: 'Subscription 1',
        price: 9.99,
        currency_id: 1,
        duration: '1 month',
        description: 'Subscription 1 description',
      },
      {
        subscription_id: 2,
        name: 'Subscription 2',
        price: 19.99,
        currency_id: 2,
        duration: '2 months',
        description: 'Subscription 2 description',
      },
    ]);
  },
};
