import { gql } from 'apollo-server-express';

const userTypes = gql`
  type User {
    _id: ID!
    name: String!
    lastname: String!
    dni: String!
    email: String!
    role: Enum_Role!
    state: Enum_StateUser
    inscriptions: [Inscription]
    createAdvance: [Advance]
    ledProject: [Project]
  }

  type Query {
    Users: [User]
    User(_id: String!): User
  }

  type Mutation {
    createUser(
      name: String!
      lastname: String!
      dni: String!
      email: String!
      role: Enum_Role!
      state: Enum_StateUser
      password: String!
    ): User

    updateUser(
      _id: String!
      name: String!
      lastname: String!
      dni: String!
      email: String!
      state: Enum_StateUser!
    ): User

    deleteUser(_id: String, email: String): User
  }
`;

export { userTypes };
