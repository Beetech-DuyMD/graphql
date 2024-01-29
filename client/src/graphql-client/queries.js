import {
  gql
} from "@apollo/client";

export const getBooks = gql `
  query getBooksQuery {
    books {
      name
      id
      gengre
    }
  }
`;
export const getDetailBook = gql `
  query getDetailBook($input: BookParam) {
    book(input: $input) {
    name
    gengre
    id
    author {
      name
      books {
        name
      }
    }
  }
  }
`;

export const getAuthors = gql `
query getAuthors {
  authors {
    name
    id
    age
  }
}
`