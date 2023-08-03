const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.user).delete();

    // Insert
    await knex(tables.user).insert([
      {
        user_id: 1,
        subscription_id: 1,
        email: "john.doe@gmail.com",
        password: "password1",
        registration_date: "2022-07-01",
      },
      {
        user_id: 2,
        subscription_id: 2,
        email: "jane.doe@gmail.com",
        password: "password2",
        registration_date: "2022-08-01",
      },
    ]);
  },
};
