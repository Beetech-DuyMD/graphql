import { gql } from "@apollo/client";

export const getBooks = gql`
  query getBooksQuery {
    books {
      name
      id
      gengre
    }
  }
`;
export const getDetailBook = gql`
  query getDetailBook($input: BookParam) {
    book(input: $input) {
      id
      name
      gengre
      author {
        id
        name
        books {
          name
        }
      }
    }
  }
`;

export const getAuthors = gql`
  query getAuthors {
    authors {
      name
      id
      age
    }
  }
`;
export const userByToken = gql`
  query UserByToken($token: String!) {
    userByToken(token: $token) {
      user_name
      email
      user_id
    }
  }
`;
