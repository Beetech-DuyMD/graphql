const { Author, Book, User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { GraphQLError } = require("graphql");

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

    user: (parent, args) => {
      const { id } = args.id;
      return User.findOne({ where: { id: id } });
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
    updateBook: async (parent, args,context) => {

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
        const { email, user_name, password } = args.input;

        const oldUser = await User.findOne({
          where: { email: email },
        });

        if (oldUser) {
          throw new GraphQLError("Email : " + email + " đã tồn tại");
        }
        let encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword);
        const newUser = new User({
          user_name: user_name,
          email: email.toLowerCase(),
          password: encryptedPassword,
        });
        const token = jwt.sign(
          {
            user_id: newUser._id,
            email: email,
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
        throw new GraphQLError(error.message);
      }
    },

    loginUser: async (parent, args) => {
      try {
        const { email, password } = args.input;
        const user = await User.findOne({ where: { email: email } });
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            {
              user_id: user.id,
              email: email,
              user_name: user.user_name,
            },
            "UNSAFE SRING",
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          return user;
        } else {
          throw new GraphQLError("Vui lòng kiểm tra lại thông tin");
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

module.exports = resolvers;
