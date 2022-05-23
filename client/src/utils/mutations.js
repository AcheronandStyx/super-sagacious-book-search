import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
          email
        }
      }
    }
}

`;

export const SAVE_BOOK = gql`

  mutation saveBook($book: BookInput) {
    saveBook(
        book: $BookInput
    ) {
      savedBooks {
        _id
        title
        authors
        description
        bookId
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      savedBooks {
        _id
        title
        bookId
      }
    }
  }
`;
