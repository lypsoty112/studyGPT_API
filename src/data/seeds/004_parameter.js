const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.parameter).del();

    // Insert
    await knex(tables.parameter).insert([
      {
        parameter_id: 1,
        command: "", // Can be left blank for now
        description: "Write a complete summary with full sentences.",
        name: "Complete Summary",
        parameter_class_id: 1,
      },
      {
        parameter_id: 2,
        command: "", // Can be left blank for now
        description:
          "Write a summary that mainly uses bullet points & keywords.",
        name: "Bullet Point Summary",
        parameter_class_id: 1,
      },
      {
        parameter_id: 3,
        command: "", // Can be left blank for now
        description:
          "Write a summary that exists only of keywords & their definitions.",
        name: "Terms & Definitions Summary",
        parameter_class_id: 1,
      },
      // How to highlight options
      {
        parameter_id: 4,
        command: "", // Can be left blank for now
        description: "Color-coded highlighting",
        name: "Color-coded",
        parameter_class_id: 2,
      },
      {
        parameter_id: 5,
        command: "", // Can be left blank for now
        description: "Bold, italic & underlined text highlighting",
        name: "Bold, Italic & Underlined Text",
        parameter_class_id: 2,
      },
      {
        parameter_id: 6,
        command: "", // Can be left blank for now
        description: "No highlighting required",
        name: "No Highlighting",
        parameter_class_id: 2,
      },

      // What to highlight options
      {
        parameter_id: 7,
        command: "", // Can be left blank for now
        description: "Highlight definitions",
        name: "Definitions",
        parameter_class_id: 3,
      },
      {
        parameter_id: 8,
        command: "", // Can be left blank for now
        description: "Highlight formulas",
        name: "Formulas",
        parameter_class_id: 3,
      },
      {
        parameter_id: 9,
        command: "", // Can be left blank for now
        description: "Highlight sections needing clarification",
        name: "Things to Clear Up",
        parameter_class_id: 3,
      },
      {
        parameter_id: 10,
        command: "", // Can be left blank for now
        description: "Highlight important concepts",
        name: "Important Concepts",
        parameter_class_id: 3,
      },
      {
        parameter_id: 11,
        command: "", // Can be left blank for now
        description: "Highlight examples",
        name: "Examples",
        parameter_class_id: 3,
      },
      {
        parameter_id: 12,
        command: "", // Can be left blank for now
        description: "Highlight new terms",
        name: "New Terms",
        parameter_class_id: 3,
      },
      {
        parameter_id: 13,
        command: "", // Can be left blank for now
        description: "Highlight nothing",
        name: "Nothing",
        parameter_class_id: 3,
      },

      // What to do at the end of each chapter options
      {
        parameter_id: 14,
        command: "", // Can be left blank for now
        description: "Create a small test",
        name: "Create a Small Test",
        parameter_class_id: 4,
      },
      {
        parameter_id: 15,
        command: "", // Can be left blank for now
        description: "Write down the content of the chapter",
        name: "Write Down Chapter Content",
        parameter_class_id: 4,
      },
      {
        parameter_id: 16,
        command: "", // Can be left blank for now
        description: "Write a list of terms seen in the chapter",
        name: "Write a List of Terms",
        parameter_class_id: 4,
      },
      {
        parameter_id: 17,
        command: "", // Can be left blank for now
        description: "Write a TLDR (Too Long; Didn't Read)",
        name: "Write a TLDR",
        parameter_class_id: 4,
      },
      {
        parameter_id: 18,
        command: "", // Can be left blank for now
        description: "Write nothing",
        name: "Write Nothing",
        parameter_class_id: 4,
      },

      // Basic additions options
      {
        parameter_id: 19,
        command: "", // Can be left blank for now
        description: "Add a table of contents",
        name: "Add a Table of Contents",
        parameter_class_id: 5,
      },
      {
        parameter_id: 20,
        command: "", // Can be left blank for now
        description: "Include examples",
        name: "Include Examples",
        parameter_class_id: 5,
      },
      {
        parameter_id: 21,
        command: "", // Can be left blank for now
        description: "Extract key concepts",
        name: "Key Concept Extraction",
        parameter_class_id: 5,
      },
      {
        parameter_id: 22,
        command: "", // Can be left blank for now
        description: "Add nothing",
        name: "Add Nothing",
      },
    ]);
  },
};
