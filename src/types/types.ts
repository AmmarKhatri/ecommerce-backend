import { address } from './address.js';
import { products } from './products.js';
import { user_info } from './user_info.js';
import { users } from './users.js';
export const typeDefs = `#graphql
  ${users}
  ${user_info}
  ${address}
  ${products}
`;