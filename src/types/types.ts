import { books } from './books.js'
import { user_info } from './user_info.js';
import { users } from './users.js';
export const typeDefs = `#graphql
  ${books}
  ${users}
  ${user_info}
`;