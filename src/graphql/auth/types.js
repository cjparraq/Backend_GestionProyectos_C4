import { gql } from 'apollo-server-express';

const authTypes = gql`
  type Token {
    token: String
    error: String
  }

  type Mutation {
    register (
      name: String!
      lastname: String!
      dni: String!
      email: String!
      role: Enum_Role!
      state: Enum_StateUser
      password: String!
    ): Token!

    login(email: String!, password: String!): Token

    refreshToken: Token
  }
`;

export { authTypes };
