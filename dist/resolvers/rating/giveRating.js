import { validateToken } from '../../helpers/validateToken.js';
import { millisecondsToTimestamp } from '../../helpers/convertTimestamp.js';
export const giveRating = async (_, { input }, context) => {
    const { order_id, product_id, rating, comment } = input;
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
                message: `Unauthorized: Cannot rate. Not a buyer`,
            };
        }
        // create a review
        const execTime = millisecondsToTimestamp(Date.now());
        await context.db.query("Insert into ratings (order_item_id, product_id, rating, comment, created_at)values ($1, $2, $3, $4, $5);", [order_id, product_id, rating, comment, execTime]);
        //update status to reviewed
        await context.db.query("UPDATE order_items SET status = 'reviewed' where id = $1;", [order_id]);
        return {
            status: 201,
            message: `Order Reviewed Successfully`,
        };
    }
    catch (error) {
        console.error('Error creating review:', error);
        return {
            status: 500,
            message: 'Internal server error.',
        };
    }
};
