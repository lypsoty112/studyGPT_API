const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.parameterClass).del();

    // Insert
    await knex(tables.parameterClass).insert([
      {
        class_id: 1,
        name: "Summary Type",
        description: "The type of summary you want to write.",
        prompt:
          "Write a [PARAMETERS] for the following text. Format in MarkDown. Use titles, tables, quotes, ... [FOLLOWING] [TEXT]",
        selection_type: 0, // 0 = single, 1 = multiple
        implemented: 1, // 0 = not implemented, 1 = implemented
        allow_empty: 0, // 0 = not allowed, 1 = allowed
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        class_id: 2,
        name: "What to Highlight",
        description: "What to highlight in your summary.",
        prompt:
          "Highlight the following elements in the summary: [PARAMETERS]. [FOLLOWING]",
        selection_type: 1, // 0 = single, 1 = multiple
        implemented: 1, // 0 = not implemented, 1 = implemented
        allow_empty: 1, // 0 = not allowed, 1 = allowed
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        class_id: 3,
        name: "How to Highlight",
        description: "How to highlight in your summary.",
        prompt: "Highlight using [PARAMETERS]. [FOLLOWING]",
        selection_type: 0, // 0 = single, 1 = multiple
        implemented: 1, // 0 = not implemented, 1 = implemented
        allow_empty: 1, // 0 = not allowed, 1 = allowed
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        class_id: 4,
        name: "Start of the summary",
        description: "What to do at the start of the summary.",
        prompt:
          "At the start of the summary, include the following elements: [PARAMETERS]. [FOLLOWING]",
        selection_type: 1, // 0 = single, 1 = multiple
        implemented: 1, // 0 = not implemented, 1 = implemented
        allow_empty: 1, // 0 = not allowed, 1 = allowed
        premium: 0, // 0 = not premium, 1 = premium
      },
      {
        class_id: 5,
        name: "End of the summary",
        description: "What to do at the end of the summary.",
        prompt:
          "At the end of the summary, include the following elements: [PARAMETERS]. [FOLLOWING]",
        selection_type: 1, // 0 = single, 1 = multiple
        implemented: 1, // 0 = not implemented, 1 = implemented
        allow_empty: 1, // 0 = not allowed, 1 = allowed
        premium: 0, // 0 = not premium, 1 = premium
      },
    ]);
  },
};
