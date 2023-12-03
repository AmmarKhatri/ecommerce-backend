import { validateToken } from '../../helpers/validateToken.js';
import { millisecondsToTimestamp } from '../../helpers/convertTimestamp.js';
export const delistProduct = async (_, { input }, context) => {
    const { id } = input;
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
        const pordId = await context.db.query('SELECT seller_id from products where id = $1;', [id]);
        if (payload.role !== 'seller' || pordId.rows[0].seller_id !== payload.id) {
            return {
                status: 409,
                message: `Unauthorizaed: Cannot delist`,
            };
        }
        // delete status updated of product
        const execTime = millisecondsToTimestamp(Date.now());
        await context.db.query('UPDATE products SET deleted_at = $1 where id = $2', [execTime, id]);
        // removed from inventory
        await context.db.query(`DELETE FROM product_inventory WHERE product_id = $1`, [id]);
        return {
            status: 202,
            message: `Product successfully delisted`,
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
