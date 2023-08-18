const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.parameterClass).del();

    // Insert
    await knex(tables.parameterClass).insert([
      {
        parameter_class_id: 1,
        class_command: "", // Can be left blank for now
        class_description: "What type of summary do you want to write?",
        class_name: "Summary Type",
        class_selectionType: 0, // 0 = Single, 1 = Multiple
      },

      {
        parameter_class_id: 2,
        class_command: "", // Can be left blank for now
        class_description: "How to highlight",
        class_name: "Highlighting Options",
        class_selectionType: 0, // 0 = Single, 1 = Multiple
      },
      {
        parameter_class_id: 3,
        class_command: "", // Can be left blank for now
        class_description: "What to highlight",
        class_name: "Highlightable Elements",
        class_selectionType: 1,
      },
      {
        parameter_class_id: 4,
        class_command: "", // Can be left blank for now
        class_description: "What to do at the end of each chapter",
        class_name: "Chapter End Actions",
        class_selectionType: 1,
      },
      {
        parameter_class_id: 5,
        class_command: "", // Can be left blank for now
        class_description: "Basic additions",
        class_name: "Additional Elements",
        class_selectionType: 1,
      },
    ]);
  },
};
