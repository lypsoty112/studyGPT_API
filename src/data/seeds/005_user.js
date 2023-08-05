const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.user).del();

    // Insert
    await knex(tables.user).insert([
      {
        date_created: new Date(),
        email: "user1@example.com",
        password: "password1",
        role_id: 1,
        subscription_id: 1,
      },
      {
        date_created: new Date(),
        email: "user2@example.com",
        password: "password2",
        role_id: 2,
        subscription_id: 2,
      },
      {
        date_created: new Date(),
        email: "user3@example.com",
        password: "password3",
        role_id: 2,
        subscription_id: 1,
      },
      {
        date_created: new Date(),
        email: "user4@example.com",
        password: "password4",
        role_id: 3,
        subscription_id: 3,
      },
      {
        date_created: new Date(),
        email: "user5@example.com",
        password: "password5",
        role_id: 3,
        subscription_id: 2,
      },
      {
        date_created: new Date(),
        email: "user6@example.com",
        password: "password6",
        role_id: 1,
        subscription_id: 3,
      },
      {
        date_created: new Date(),
        email: "user7@example.com",
        password: "password7",
        role_id: 1,
        subscription_id: 1,
      },
      {
        date_created: new Date(),
        email: "user8@example.com",
        password: "password8",
        role_id: 2,
        subscription_id: 2,
      },
      {
        date_created: new Date(),
        email: "user9@example.com",
        password: "password9",
        role_id: 2,
        subscription_id: 1,
      },
      {
        date_created: new Date(),
        email: "user10@example.com",
        password: "password10",
        role_id: 3,
        subscription_id: 3,
      },
    ]);
  },
};
