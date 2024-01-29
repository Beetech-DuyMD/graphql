import {
    gql
} from "@apollo/client";

export const createBook = gql `
mutation createBook($input: BookParam) {
  createBook(input: $input) {
    name
  }
}
`

export const createAuthor = gql `
mutation createAuthor($input: AuthorParam) {
  createAuthor(input: $input) {
    name
  }
}
`