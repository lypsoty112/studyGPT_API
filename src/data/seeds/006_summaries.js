const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    // Delete
    await knex(tables.summary).delete();

    // Insert
    await knex(tables.summary).insert([
      {
        summary_id: 1,
        user_id: 1,
        date_created: '2023-07-04 00:00:00',
        date_modified: '2023-07-04 00:00:00',
        content: `# Markdown 'Lorem Ipsum' Text

        ## Introduction
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod orci at justo tristique, vitae commodo nisl pellentesque. Fusce scelerisque sem ut lectus efficitur, sit amet rutrum ligula fringilla. Nullam vel tortor a neque faucibus lobortis sed auctor risus. Sed sed efficitur urna. Ut id diam a turpis dapibus varius sed nec libero. Nunc vehicula justo nec odio fermentum aliquet. Mauris scelerisque urna sit amet augue viverra interdum. In vel nibh id ligula hendrerit malesuada.
        
        ## Formatting Text
        
        Markdown offers various ways to format text, including:
        
        1. **Bold Text**: You can make text **bold** by surrounding it with double asterisks or double underscores.
        
        2. *Italic Text*: To emphasize certain words or phrases, you can use *italics* by enclosing the text with single asterisks or single underscores.
        
        3. ~~Strikethrough~~: In markdown, you can ~~strike through~~ text by using double tildes.
        
        ## Creating Lists
        
        Lists are an essential part of conveying information. Markdown allows you to create both ordered and unordered lists. Here's an example of each:
        
        ### Ordered List
        
        1. Lorem ipsum dolor sit amet
        2. Consectetur adipiscing elit
        3. Vestibulum euismod orci at justo tristique
        4. Fusce scelerisque sem ut lectus efficitur
        5. Nullam vel tortor a neque faucibus lobortis
        
        ### Unordered List
        
        - Fusce scelerisque sem ut lectus efficitur
        - Sit amet rutrum ligula fringilla
        - Nullam vel tortor a neque faucibus lobortis
        - Sed sed efficitur urna
        - Ut id diam a turpis dapibus varius
        
        ## Conclusion
        
        In summary, Markdown is a versatile and user-friendly markup language for formatting text. It offers various options for emphasizing, organizing, and enhancing your content. Whether you need to create bold or italic text, include lists, or add links, Markdown has you covered. Its simplicity and widespread adoption make it a popular choice for creating content across different platforms. So, start using Markdown today and make your text stand out!`,
        name: 'Summary 1',
        description: 'Summary 1 description',
      },
      {
        summary_id: 2,
        user_id: 2,
        date_created: '2023-07-04 00:00:00',
        date_modified: '2023-07-04 00:00:00',
        content: `# Markdown 'Lorem Ipsum' Text

        ## Introduction
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod orci at justo tristique, vitae commodo nisl pellentesque. Fusce scelerisque sem ut lectus efficitur, sit amet rutrum ligula fringilla. Nullam vel tortor a neque faucibus lobortis sed auctor risus. Sed sed efficitur urna. Ut id diam a turpis dapibus varius sed nec libero. Nunc vehicula justo nec odio fermentum aliquet. Mauris scelerisque urna sit amet augue viverra interdum. In vel nibh id ligula hendrerit malesuada.
        
        ## Formatting Text
        
        Markdown offers various ways to format text, including:
        
        1. **Bold Text**: You can make text **bold** by surrounding it with double asterisks or double underscores.
        
        2. *Italic Text*: To emphasize certain words or phrases, you can use *italics* by enclosing the text with single asterisks or single underscores.
        
        3. ~~Strikethrough~~: In markdown, you can ~~strike through~~ text by using double tildes.
        
        ## Creating Lists
        
        Lists are an essential part of conveying information. Markdown allows you to create both ordered and unordered lists. Here's an example of each:
        
        ### Ordered List
        
        1. Lorem ipsum dolor sit amet
        2. Consectetur adipiscing elit
        3. Vestibulum euismod orci at justo tristique
        4. Fusce scelerisque sem ut lectus efficitur
        5. Nullam vel tortor a neque faucibus lobortis
        
        ### Unordered List
        
        - Fusce scelerisque sem ut lectus efficitur
        - Sit amet rutrum ligula fringilla
        - Nullam vel tortor a neque faucibus lobortis
        - Sed sed efficitur urna
        - Ut id diam a turpis dapibus varius
        
        ## Conclusion
        
        In summary, Markdown is a versatile and user-friendly markup language for formatting text. It offers various options for emphasizing, organizing, and enhancing your content. Whether you need to create bold or italic text, include lists, or add links, Markdown has you covered. Its simplicity and widespread adoption make it a popular choice for creating content across different platforms. So, start using Markdown today and make your text stand out!`,
        name: 'Summary 2',
        description: 'Summary 2 description',
      },
    ]);
  },
};
