const { Author, Book } = require("../models");

const resolvers = {
  Query: {
    books: async (parent, args) => {
      return await Book.findAll();
    },

    book: async (parent, args) => {
      const { id } = args.input;
      return await Book.findOne({ where: { id: id } });
    },

    authors: async (parent, args) => {
      return await Author.findAll();
    },

    author: (parent, args) => {
      const { id } = args.input;
      return Author.findOne({ where: { id: id } });
    },
  },

  Book: {
    author: async (parent, args) => {
      return Author.findOne({ where: { id: parent.authorId } });
    },
  },
  Author: {
    books: (parent, args) => {
      return Book.findAll({ where: { authorId: parent.id } });
    },
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args) => {
      const newAuthor = await Author.create(args.input);
      return newAuthor;
    },
    createBook: async (parent, args) => {
      const newBook = await Book.create(args.input);
      return newBook;
    },
    updateBook: async (parent, args) => {
      const newBook = await Book.update(args.input, {
        where: {
          id: args.id,
        },
      });
      return newBook
    },
    deleteBook: async (parent, args) => {
      await Book.destroy({
        where: {
          id: args.id,
        },
      });
      return "Xóa thành công";
    },
  },
};

module.exports = resolvers;
