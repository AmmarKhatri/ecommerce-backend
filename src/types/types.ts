import { user_info } from './user_info.js';
import { users } from './users.js';
export const typeDefs = `#graphql
  ${users}
  ${user_info}
`;