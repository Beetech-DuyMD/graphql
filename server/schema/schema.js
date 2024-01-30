const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID
    name: String
    gengre: String
    author: Author
  }

  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }

  input BookParam {
    id: ID
    name: String
    gengre: String
    authorId: ID
  }

  input AuthorParam {
    id: ID
    name: String
    age: Int
  }

  type User{
    username: String
    email: String
    password: String
    token: String
  }

  input RegisterInput{
    user_name: String
    email: String
    password: String
  }

  type LoginInput{
    email: String
    password: String
  }
  #root type
  type Query {
    books: [Book]
    book(input: BookParam): Book
    authors: [Author]
    author(input: AuthorParam): Author
  }

  # Mutation
  type Mutation {
    createAuthor(input: AuthorParam): Author
    createBook(input: BookParam): Book
    updateBook(id: ID!, input: BookParam): Book
    deleteBook(id: ID): String
    # USER
    registerUser(input: RegisterInput) : User
  }
`;

module.exports = typeDefs;
