import { validateToken } from '../../helpers/validateToken.js';
export const getEnlistedProducts = async (_, __, context) => {
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
        if (payload.role !== 'seller') {
            return {
                status: 409,
                message: `Only seller can view inventory`,
            };
        }
        // query the user
        const products = await context.db.query("Select * from products p join product_inventory pi on p.id = pi.product_id where p.seller_id = $1 and p.deleted_at is null;", [payload.id]);
        // check if info already input
        const resProducts = [...products.rows];
        return {
            status: 201,
            message: `Product successfully enlisted`,
            products: resProducts,
        };
    }
    catch (error) {
        console.error('Error enlisting product:', error);
        return {
            status: 500,
            message: 'Internal server error.',
        };
    }
};
