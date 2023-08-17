const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.parameterClass).del();

    // Insert
    await knex(tables.parameterClass).insert([
      {
        parameter_class_id: 1,
        class_command: "cmd1",
        class_description: "Description for command 1",
        class_name: "Parameter Class 1",
        class_selectionType: 1,
      },
      {
        parameter_class_id: 2,
        class_command: "cmd2",
        class_description: "Description for command 2",
        class_name: "Parameter Class 2",
        class_selectionType: 0,
      },
      {
        parameter_class_id: 3,
        class_command: "cmd3",
        class_description: "Description for command 3",
        class_name: "Parameter Class 3",
        class_selectionType: 1,
      },
      {
        parameter_class_id: 4,
        class_command: "cmd4",
        class_description: "Description for command 4",
        class_name: "Parameter Class 4",
        class_selectionType: 0,
      },
      {
        parameter_class_id: 5,
        class_command: "cmd5",
        class_description: "Description for command 5",
        class_name: "Parameter Class 5",
        class_selectionType: 0,
      },
      {
        parameter_class_id: 6,
        class_command: "cmd6",
        class_description: "Description for command 6",
        class_name: "Parameter Class 6",
        class_selectionType: 1,
      },
      {
        parameter_class_id: 7,
        class_command: "cmd7",
        class_description: "Description for command 7",
        class_name: "Parameter Class 7",
        class_selectionType: 0,
      },
      {
        parameter_class_id: 8,
        class_command: "cmd8",
        class_description: "Description for command 8",
        class_name: "Parameter Class 8",
        class_selectionType: 0,
      },
      {
        parameter_class_id: 9,
        class_command: "cmd9",
        class_description: "Description for command 9",
        class_name: "Parameter Class 9",
        class_selectionType: 1,
      },
      {
        parameter_class_id: 10,
        class_command: "cmd10",
        class_description: "Description for command 10",
        class_name: "Parameter Class 10",
        class_selectionType: 0,
      },
    ]);
  },
};
