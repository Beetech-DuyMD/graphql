const { Author, Book, User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
      return newBook;
    },
    deleteBook: async (parent, args) => {
      await Book.destroy({
        where: {
          id: args.id,
        },
      });
      return "Xóa thành công";
    },

    // USERRRRRRRRRRRRR
    registerUser: async (parent, args) => {
      try {
        const { input } = args;

        const oldUser = await User.findOne({
          where: { email: input.email },
        });

        if (oldUser) {
          console.log(oldUser);
          return "Email : " + input.email + " đã tồn tại";
        }
        let encryptedPassword = await bcrypt.hash(input.password, 10);
        console.log(encryptedPassword);
        const newUser = new User({
          user_name: input.user_name,
          email: input.email.toLowerCase(),
          password: encryptedPassword,
        });
        const token = jwt.sign(
          {
            user_id: newUser._id,
            email: input.email,
          },
          "UNSAFE SRING",
          {
            expiresIn: "2h",
          }
        );

        newUser.token = token;

        const res = newUser.save();
        return res;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};

module.exports = resolvers;
