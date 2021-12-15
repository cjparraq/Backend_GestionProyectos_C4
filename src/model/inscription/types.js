import { gql } from 'apollo-server-express';

const inscriptionTypes = gql`
  type Inscription {
    _id: ID!
    estado: Enum_InscriptionState!
    date_init: Date
    date_end: Date
    project: Project!
    student: User!
  }

  type Query {
    Inscriptions: [Inscription]
  }

  type Mutation {
    createInscription(
      estado: Enum_InscriptionState!
      project: String!
      student: String!
    ): Inscription

    approveInscription(id: String!): Inscription
  }
`;

export { inscriptionTypes };
