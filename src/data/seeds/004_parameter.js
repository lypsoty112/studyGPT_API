const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.parameter).del();

    // Insert
    await knex(tables.parameter).insert([
      // Summary Type
      {
        parameter_id: 1,
        class_id: 1,
        name: "Full Summary",
        description: "A full summary of the given document.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        parameter_id: 2,
        class_id: 1,
        name: "Bullet Points",
        description: "A list of bullet points summarizing the given document.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        parameter_id: 3,
        class_id: 1,
        name: "Terms & Definitions",
        description:
          "A list of terms and their definitions from the given document.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
      // What to Highlight
      {
        parameter_id: 4,
        class_id: 2,
        name: "Important Sentences",
        description: "The most important sentences from the given document.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        parameter_id: 5,
        class_id: 2,
        name: "Important Words",
        description: "The most important words from the given document.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        parameter_id: 6,
        class_id: 2,
        name: "Definitions",
        description: "The definitions of the concepts from the given document.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
      // How to Highlight
      {
        parameter_id: 7,
        class_id: 3,
        name: "Bold, Italic & Underline",
        description: "Highlight the summary using boldn, italic & underlining.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 1, // 0 = not premium, 1 = premium
      },
      {
        parameter_id: 8,
        class_id: 3,
        name: "Colored highlighting",
        description: "Highlight the summary using colored highlighting.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 1, // 0 = not premium, 1 = premium
      },
      // Start of summary
      {
        parameter_id: 9,
        class_id: 4,
        name: "Introduction",
        description: "Start the summary with an introduction.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        parameter_id: 10,
        class_id: 4,
        name: "Table of Contents",
        description: "Start the summary with a table of contents.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
      // End of summary
      {
        parameter_id: 11,
        class_id: 5,
        name: "TL;DR",
        description: "End the summary with a TL;DR.",
        prompt: "", // TODO: Add prompt
        implemented: 1, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        parameter_id: 12,
        class_id: 5,
        name: "Test Yourself",
        description: "End the summary with a test for the reader to take.",
        prompt: "", // TODO: Add prompt
        implemented: 0, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        parameter_id: 13,
        class_id: 5,
        name: "Things to remember",
        description: "End the summary with a list of things to remember.",
        prompt: "", // TODO: Add prompt
        implemented: 0, // 0 = not implemented, 1 = implemented
        premium: 0, // 0 = not premium, 1 = premium
      },
    ]);
  },
};
