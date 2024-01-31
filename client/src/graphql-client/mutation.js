import { gql } from "@apollo/client";

export const createBook = gql`
  mutation createBook($input: BookParam) {
    createBook(input: $input) {
      name
    }
  }
`;

export const createAuthor = gql`
  mutation createAuthor($input: AuthorParam) {
    createAuthor(input: $input) {
      name
    }
  }
`;

export const deleteBook = gql`
  mutation deleteBook($deleteBookId: ID) {
    deleteBook(id: $deleteBookId)
  }
`;

export const updateBook = gql`
  mutation updateBook($updateBookId: ID!, $input: BookParam) {
    updateBook(id: $updateBookId, input: $input) {
      name
    }
  }
`;

export const registerUser = gql`
  mutation registerUser($input: RegisterInput) {
    registerUser(input: $input) {
      user_name
      email
      password
      token
    }
  }
`;
export const loginUser = gql`
  mutation loginUser($input: LoginInput) {
    loginUser(input: $input) {
      token
      password
      email
      user_name
    }
  }
`;
