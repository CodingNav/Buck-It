const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bio: String
    picture: String
    followers: []
    following: []
    privacy_mode: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation{
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
