const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.parameter).del();

    // Insert
    await knex(tables.parameter).insert([
      {
        command: "cmd1",
        description: "Description for parameter 1",
        name: "Parameter 1",
        parameter_class_id: 1,
      },
      {
        command: "cmd2",
        description: "Description for parameter 2",
        name: "Parameter 2",
        parameter_class_id: 1,
      },
      {
        command: "cmd3",
        description: "Description for parameter 3",
        name: "Parameter 3",
        parameter_class_id: 2,
      },
      {
        command: "cmd4",
        description: "Description for parameter 4",
        name: "Parameter 4",
        parameter_class_id: 2,
      },
      {
        command: "cmd5",
        description: "Description for parameter 5",
        name: "Parameter 5",
        parameter_class_id: 3,
      },
      {
        command: "cmd6",
        description: "Description for parameter 6",
        name: "Parameter 6",
        parameter_class_id: 3,
      },
      {
        command: "cmd7",
        description: "Description for parameter 7",
        name: "Parameter 7",
        parameter_class_id: 4,
      },
      {
        command: "cmd8",
        description: "Description for parameter 8",
        name: "Parameter 8",
        parameter_class_id: 4,
      },
      {
        command: "cmd9",
        description: "Description for parameter 9",
        name: "Parameter 9",
        parameter_class_id: 5,
      },
      {
        command: "cmd10",
        description: "Description for parameter 10",
        name: "Parameter 10",
        parameter_class_id: 5,
      },
    ]);
  },
};
