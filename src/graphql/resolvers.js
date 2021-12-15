import { projectResolvers } from '../model/project/resolvers.js';
import { UserResolvers } from '../model/user/resolvers.js';
import { progressResolvers } from '../model/advance/resolvers.js';
import { inscriptionResolvers } from '../model/inscription/resolvers.js';
import { authResolvers } from './auth/resolvers.js';

export const resolvers = [ 
  projectResolvers, 
  UserResolvers,
  progressResolvers, 
  inscriptionResolvers,
  authResolvers,
 ];