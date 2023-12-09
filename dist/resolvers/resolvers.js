import { addAddress } from './address/addAddress.js';
import { getAddresses } from './address/getAddresses.js';
import { removeAddress } from './address/removeAddress.js';
import { changeInventory } from './inventory/changeInventory.js';
import { fetchOrderByBuyer } from './orders/fetchOrderByBuyer.js';
import { placeOrder } from './orders/placeOrder.js';
import { delistProduct } from './products/delistProduct.js';
import { enlistProduct } from './products/enlistProduct.js';
import { fetchProducts } from './products/fetchProducts.js';
import { getEnlistedProducts } from './products/getEnlistedProducts.js';
import { addUserInfo } from './user_info/addUserInfo.js';
import { editUserInfo } from './user_info/editUserInfo.js';
import { fetchUserPrivateInfo } from './user_info/fetchUserPrivateInfo.js';
import { fetchUserPublicInfo } from './user_info/fetchUserPublicInfo.js';
import { isOnboarded } from './user_info/isOnboarded.js';
import { loginUser } from './users/loginUser.js';
import { registerUser } from './users/registerUser.js';
export const resolvers = {
    Query: {
        fetchUserPublicInfo,
        fetchUserPrivateInfo,
        isOnboarded,
        getAddresses,
        getEnlistedProducts,
        fetchOrderByBuyer,
        fetchProducts,
    },
    Mutation: {
        registerUser,
        loginUser,
        addUserInfo,
        editUserInfo,
        addAddress,
        removeAddress,
        enlistProduct,
        delistProduct,
        changeInventory,
        placeOrder,
    }
};
