import { validateToken } from '../../helpers/validateToken.js';
export const searchProducts = async (_, { input }, context) => {
    const { text } = input;
    try {
        // Get the headers from the context
        const { headers } = context.req;
        // Accessing an authorization token from headers
        const authorizationHeader = headers.authorization;
        if (!authorizationHeader) {
            return {
                status: 401,
                message: 'Unauthorized: Missing Authorization Header',
            };
        }
        // validating the token
        let payload;
        try {
            payload = validateToken(authorizationHeader);
        }
        catch (error) {
            return {
                status: 400,
                message: 'Invalid token',
            };
        }
        if (payload.role !== 'buyer') {
            return {
                status: 409,
                message: `Only buyer can search products`,
            };
        }
        // query the user
        const products = await context.db.query("Select * from products p join product_inventory pi on p.id = pi.product_id where p.deleted_at is null and pi.quantity > 0 and p.name ilike '" + text + "%' LIMIT 10;", []);
        // check if info already input
        const resProducts = [...products.rows];
        return {
            status: 200,
            message: `Search successful`,
            products: resProducts,
        };
    }
    catch (error) {
        console.error('Error searching product:', error);
        return {
            status: 500,
            message: 'Internal server error.',
        };
    }
};
