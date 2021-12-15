import { gql } from 'apollo-server-express';

const projectTypes = gql`
  type Objective {
    _id: ID!
    description: String!
    Types: Enum_TypeObjective!
  }

  input createObjective {
    description: String!
    Types: Enum_TypeObjective!
  }

  input fieldsObjective {
    description: String!
    Types: Enum_TypeObjective!
  }

  input fieldsProject {
    name: String
    budget: Float
    date_init: Date
    date_end: Date
    state: Enum_StateProject
    phase: Enum_PhaseProject
    leader: String
  }

  type Project {
    _id: ID!
    name: String!
    budget: Float!
    date_init: Date!
    date_end: Date!
    state: Enum_StateProject!
    phase: Enum_PhaseProject!
    leader: User!
    Objectives: [Objective]
    advances: [Advance]
    inscriptions: [Inscription]
  }

  type Query {
    Projects: [Project]
  }

  type Mutation {
    createProject(
      name: String!
      budget: Float!
      date_init: Date!
      date_end: Date!
      state: Enum_StateProject!
      phase: Enum_PhaseProject!
      leader: String!
      Objectives: [createObjective]
    ): Project

    updateProject(_id: String!, fields: fieldsProject!): Project

    createObjective(idProject: String!, fields: fieldsObjective!): Project

    updateObjective(idProject: String!, indexObjective: Int!, fields: fieldsObjective!): Project

    deleteObjective(idProject: String!, idObjective: String!): Project
  }
`;

export { projectTypes };
