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
  }
`;

module.exports = typeDefs;
