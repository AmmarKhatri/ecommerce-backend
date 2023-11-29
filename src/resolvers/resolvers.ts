import { addUserInfo } from './user_info/addUserInfo.js';
import { editUserInfo } from './user_info/editUserInfo.js';
import { fetchUserPrivateInfo } from './user_info/fetchUserPrivateInfo.js';
import { fetchUserPublicInfo } from './user_info/fetchUserPublicInfo.js';
import { loginUser } from './users/loginUser.js';
import { registerUser } from './users/registerUser.js'

export const resolvers = {
  Query: {
    fetchUserPublicInfo,
    fetchUserPrivateInfo,
  },
  Mutation: {
    registerUser,
    loginUser,
    addUserInfo,
    editUserInfo,
  }
};

