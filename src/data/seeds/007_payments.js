const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.payment).delete();

    // Insert
    await knex(tables.payment).insert([
      {
        payment_id: 1,
        subscription_id: 1, // Replace with the appropriate subscription ID
        user_id: 1,
        date: '2023-07-04 00:00:00',
        amount: 100.00,
        currency_id: 1,
        status_id: 1, // Replace with the appropriate status ID
        description: 'Payment 1 description',
      },
      {
        payment_id: 2,
        subscription_id: 2, // Replace with the appropriate subscription ID
        user_id: 2,
        date: '2023-07-04 00:00:00',
        amount: 200.00,
        currency_id: 2,
        status_id: 2, // Replace with the appropriate status ID
        description: 'Payment 2 description',
      },
    ]);
  },
};
