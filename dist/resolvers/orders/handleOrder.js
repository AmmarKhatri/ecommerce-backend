import { validateToken } from '../../helpers/validateToken.js';
export const handleOrder = async (_, { input }, context) => {
    const { product_id, order_id, quantity, deliver } = input;
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
                message: `Unauthorizaed: Cannot make a purchase. Not a buyer`,
            };
        }
        // first check if status is pending
        const result = await context.db.query({
            text: `SELECT * from order_items oi
            join products p on p.id = oi.product_id
            where product_id = $1 and seller_id = $2 and oi.status = 'placed' and oi.id = $3;`,
            values: [product_id, payload.id, order_id],
        });
        if (result.rows.length === 0) {
            return {
                status: 404,
                message: `Status not pending`,
            };
        }
        // handle status
        if (deliver) {
            await context.db.query({
                text: 'UPDATE order_items SET status = $1 where id = $2;',
                values: ['fulfilled', order_id],
            });
        }
        else {
            await context.db.query({
                text: 'UPDATE order_items SET status = $1 where id = $2;',
                values: ['cancelled', order_id],
            });
            //update inventory as well
            await context.db.query({
                text: 'UPDATE product_inventory SET quantity = quantity + $1 where product_id = $2;',
                values: [quantity, order_id],
            });
        }
        return {
            status: 201,
            message: `Successfully updated order`,
        };
    }
    catch (error) {
        console.error('Error updating order status:', error);
        return {
            status: 500,
            message: 'Internal server error.',
        };
    }
};
