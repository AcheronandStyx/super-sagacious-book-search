// import the gql tagged template function
const { gql } = require("apollo-server-express");

// not sure on authors array below

// create our typeDefs
const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  input BookInput {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Query {
    userId(_id: ID): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): User
    saveBook(book: BookInput): User
    deleteBook(user: UserInput)
  }
`;
// get user by ID and GET ME
// export the typeDefs
module.exports = typeDefs;
