import { gql } from 'apollo-server-express';

const EnumsTypes = gql`
  enum Enum_StateUser {
    PENDING
    AUTHORIZED
    NO_AUTHORIZED
  }

  enum Enum_Role {
    STUDENT
    LEADER
    ADMINISTRATOR
  }

  enum Enum_StateProject {
    ACTIVE
    INACTIVE
  }

  enum Enum_PhaseProject {
    INITIATED
    DEVELOPING
    FINISHED
    NULL
  }

  enum Enum_TypeObjective {
    GENERAL
    SPECIFIC
  }

  enum Enum_InscriptionState {
    ACCEPTED
    REJECTED
    EARRING
  }
`;

export { EnumsTypes };
