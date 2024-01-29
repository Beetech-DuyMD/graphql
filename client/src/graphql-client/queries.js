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
        name
      }
    }
  }
`;
