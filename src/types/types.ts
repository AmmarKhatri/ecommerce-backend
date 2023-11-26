import {books} from './books.js'
import { users } from './users.js';
export const typeDefs = `#graphql
  ${books}
  ${users}
`;