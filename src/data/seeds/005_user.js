const { tables } = require("..");
const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(1);
  return await bcrypt.hash(password, salt);
};

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
        password: await encryptPassword("password1"),
        role_id: 1,
        subscription_id: 1,
      },
      {
        user_id: 2,
        date_created: new Date(),
        email: "user2@example.com",
        password: await encryptPassword("password2"),
        role_id: 2,
        subscription_id: 2,
      },
      {
        user_id: 3,
        date_created: new Date(),
        email: "user3@example.com",
        password: await encryptPassword("password3"),
        role_id: 2,
        subscription_id: 1,
      },
      {
        user_id: 4,
        date_created: new Date(),
        email: "test@studygpt.com",
        password: await encryptPassword("password"),
        role_id: 1,
        subscription_id: 1,
      },
    ]);
  },
};
