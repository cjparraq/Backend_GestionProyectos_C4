import { gql } from 'apollo-server-express';

const advanceTypes = gql`
  type Advance {
    _id: ID!
    Date: Date!
    description: String!
    observations: [String]
    project: Project!
    CreatedBy: User!
  }

  type Query {
    Advances: [Advance]
    AdvanceFilter(_id: String!): [Advance]
  }
  type Mutation {
    createAdvance(Date: Date!, description: String!, project: String!, CreatedBy: String!): Advance
  }
`;

export { advanceTypes };
