const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.currency).delete();

    // Insert
    await knex(tables.currency).insert([
      { currency_id: 1, code: 'USD', name: 'US Dollar', symbol: '$' },
      { currency_id: 2, code: 'EUR', name: 'Euro', symbol: '€' },
    ]);
  },
};
