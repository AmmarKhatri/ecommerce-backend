import { address } from './address.js';
import { inventory } from './inventory.js';
import { orders } from './orders.js';
import { products } from './products.js';
import { ratings } from './rating.js';
import { user_info } from './user_info.js';
import { users } from './users.js';
export const typeDefs = `#graphql
  ${users}
  ${user_info}
  ${address}
  ${products}
  ${inventory}
  ${orders}
  ${ratings}
`;
