import { addUserInfo } from './user_info/addUserInfo.js';
import { loginUser } from './users/loginUser.js';
import { registerUser } from './users/registerUser.js'
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  export const resolvers = {
    Query: {
      //sample query
      books: () => books,
      
    },
    Mutation: {
      registerUser,
      loginUser,
      addUserInfo,
    }
  };

