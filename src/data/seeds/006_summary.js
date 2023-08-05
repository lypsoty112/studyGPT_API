const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.summary).del();

    // Insert
    await knex(tables.summary).insert([
      {
        summary_id: 1,
        content: "Summary content 1",
        date_created: new Date(),
        date_modified: new Date(),
        description: "Summary description 1",
        title: "Summary Title 1",
        user_id: 1,
      },
      {
        summary_id: 2,
        content: "Summary content 2",
        date_created: new Date(),
        date_modified: new Date(),
        description: "Summary description 2",
        title: "Summary Title 2",
        user_id: 2,
      },
      {
        summary_id: 3,
        content: "Summary content 3",
        date_created: new Date(),
        date_modified: new Date(),
        description: "Summary description 3",
        title: "Summary Title 3",
        user_id: 3,
      },
      {
        summary_id: 4,
        content: "Summary content 4",
        date_created: new Date(),
        date_modified: new Date(),
        description: "Summary description 4",
        title: "Summary Title 4",
        user_id: 1,
      },
      {
        summary_id: 5,
        content: "Summary content 5",
        date_created: new Date(),
        date_modified: new Date(),
        description: "Summary description 5",
        title: "Summary Title 5",
        user_id: 2,
      },
      {
        summary_id: 6,
        content: "Summary content 6",
        date_created: new Date(),
        date_modified: new Date(),
        description: "Summary description 6",
        title: "Summary Title 6",
        user_id: 3,
      },
      {
        summary_id: 7,
        content: "Summary content 7",
        date_created: new Date(),
        date_modified: new Date(),
        description: "Summary description 7",
        title: "Summary Title 7",
        user_id: 1,
      },
      {
        summary_id: 8,
        content: "Summary content 8",
        date_created: new Date(),
        date_modified: new Date(),
        description: "Summary description 8",
        title: "Summary Title 8",
        user_id: 2,
      },
      {
        summary_id: 9,
        content: "Summary content 9",
        date_created: new Date(),
        date_modified: new Date(),
        description: "Summary description 9",
        title: "Summary Title 9",
        user_id: 3,
      },
      {
        summary_id: 10,
        content: "Summary content 10",
        date_created: new Date(),
        date_modified: new Date(),
        description: "Summary description 10",
        title: "Summary Title 10",
        user_id: 1,
      },
    ]);
  },
};
