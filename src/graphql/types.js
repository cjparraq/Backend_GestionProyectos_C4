import { gql } from 'apollo-server-express';
import { EnumsTypes } from '../model/enums/types.js';
import { userTypes } from '../model/user/types.js';
import { projectTypes } from '../model/project/types.js';
import { advanceTypes } from '../model/advance/types.js';
import { inscriptionTypes } from '../model/inscription/types.js';
import { authTypes } from './auth/types.js';

const globalTypes = gql`
  scalar Date
`;

export const types = [
  globalTypes,
  EnumsTypes,
  userTypes,
  projectTypes,
  advanceTypes,
  inscriptionTypes,
  authTypes,
];
