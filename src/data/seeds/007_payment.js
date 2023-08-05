const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.payment).del();

    // Insert
    await knex(tables.payment).insert([
      {
        payment_id: "payment1",
        amount: 10.99,
        currency: "USD",
        payment_date: new Date(),
        payment_status: "Paid",
        subscription_id: 1,
        user_id: 1,
      },
      {
        payment_id: "payment2",
        amount: 15.49,
        currency: "EUR",
        payment_date: new Date(),
        payment_status: "Paid",
        subscription_id: 2,
        user_id: 2,
      },
      {
        payment_id: "payment3",
        amount: 5.99,
        currency: "USD",
        payment_date: new Date(),
        payment_status: "Paid",
        subscription_id: 3,
        user_id: 3,
      },
      {
        payment_id: "payment4",
        amount: 12.99,
        currency: "GBP",
        payment_date: new Date(),
        payment_status: "Paid",
        subscription_id: 1,
        user_id: 1,
      },
      {
        payment_id: "payment5",
        amount: 8.49,
        currency: "EUR",
        payment_date: new Date(),
        payment_status: "Failed",
        subscription_id: 2,
        user_id: 2,
      },
      {
        payment_id: "payment6",
        amount: 6.99,
        currency: "USD",
        payment_date: new Date(),
        payment_status: "Paid",
        subscription_id: 3,
        user_id: 3,
      },
      {
        payment_id: "payment7",
        amount: 9.99,
        currency: "USD",
        payment_date: new Date(),
        payment_status: "Paid",
        subscription_id: 1,
        user_id: 1,
      },
      {
        payment_id: "payment8",
        amount: 11.49,
        currency: "GBP",
        payment_date: new Date(),
        payment_status: "Pending",
        subscription_id: 2,
        user_id: 2,
      },
      {
        payment_id: "payment9",
        amount: 7.99,
        currency: "EUR",
        payment_date: new Date(),
        payment_status: "Failed",
        subscription_id: 3,
        user_id: 3,
      },
      {
        payment_id: "payment10",
        amount: 13.99,
        currency: "USD",
        payment_date: new Date(),
        payment_status: "Paid",
        subscription_id: 1,
        user_id: 1,
      },
    ]);
  },
};
