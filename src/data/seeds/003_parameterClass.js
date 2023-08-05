const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.parameterClass).del();

    // Insert
    await knex(tables.parameterClass).insert([
      {
        command: "cmd1",
        description: "Description for command 1",
        name: "Parameter Class 1",
        selectionType: "Type A",
      },
      {
        command: "cmd2",
        description: "Description for command 2",
        name: "Parameter Class 2",
        selectionType: "Type B",
      },
      {
        command: "cmd3",
        description: "Description for command 3",
        name: "Parameter Class 3",
        selectionType: "Type A",
      },
      {
        command: "cmd4",
        description: "Description for command 4",
        name: "Parameter Class 4",
        selectionType: "Type C",
      },
      {
        command: "cmd5",
        description: "Description for command 5",
        name: "Parameter Class 5",
        selectionType: "Type B",
      },
      {
        command: "cmd6",
        description: "Description for command 6",
        name: "Parameter Class 6",
        selectionType: "Type A",
      },
      {
        command: "cmd7",
        description: "Description for command 7",
        name: "Parameter Class 7",
        selectionType: "Type C",
      },
      {
        command: "cmd8",
        description: "Description for command 8",
        name: "Parameter Class 8",
        selectionType: "Type B",
      },
      {
        command: "cmd9",
        description: "Description for command 9",
        name: "Parameter Class 9",
        selectionType: "Type A",
      },
      {
        command: "cmd10",
        description: "Description for command 10",
        name: "Parameter Class 10",
        selectionType: "Type C",
      },
    ]);
  },
};
