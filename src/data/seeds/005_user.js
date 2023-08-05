const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.user).del();

    // Insert
    await knex(tables.user).insert([
      {
        user_id: 1,
        date_created: new Date(),
        email: "user1@example.com",
        password: "password1",
        role_id: 1,
        subscription_id: 1,
      },
      {
        user_id: 2,
        date_created: new Date(),
        email: "user2@example.com",
        password: "password2",
        role_id: 2,
        subscription_id: 2,
      },
      {
        user_id: 3,
        date_created: new Date(),
        email: "user3@example.com",
        password: "password3",
        role_id: 2,
        subscription_id: 1,
      },
      {
        user_id: 4,
        date_created: new Date(),
        email: "user4@example.com",
        password: "password4",
        role_id: 3,
        subscription_id: 3,
      },
      {
        user_id: 5,
        date_created: new Date(),
        email: "user5@example.com",
        password: "password5",
        role_id: 3,
        subscription_id: 2,
      },
      {
        user_id: 6,
        date_created: new Date(),
        email: "user6@example.com",
        password: "password6",
        role_id: 1,
        subscription_id: 3,
      },
      {
        user_id: 7,
        date_created: new Date(),
        email: "user7@example.com",
        password: "password7",
        role_id: 1,
        subscription_id: 1,
      },
      {
        user_id: 8,
        date_created: new Date(),
        email: "user8@example.com",
        password: "password8",
        role_id: 2,
        subscription_id: 2,
      },
      {
        user_id: 9,
        date_created: new Date(),
        email: "user9@example.com",
        password: "password9",
        role_id: 2,
        subscription_id: 1,
      },
      {
        user_id: 10,
        date_created: new Date(),
        email: "user10@example.com",
        password: "password10",
        role_id: 3,
        subscription_id: 3,
      },
      {
        user_id: 11,
        date_created: new Date(),
        email: "test@studygpt.com",
        password: "password",
        role_id: 1,
        subscription_id: 1,
      },
    ]);
  },
};
