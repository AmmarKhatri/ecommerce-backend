import { validateToken } from '../../helpers/validateToken.js';
import { millisecondsToTimestamp } from '../../helpers/convertTimestamp.js';
export const removeAddress = async (_, { input }, context) => {
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
        // add info
        const execTime = millisecondsToTimestamp(Date.now());
        const result = await context.db.query('UPDATE address set deleted_at = $1 where id = $2;', [execTime, id]);
        // update status of user to onboard
        return {
            status: 201,
            message: `Address successfully removed`,
        };
    }
    catch (error) {
        console.error('Error removing address:', error);
        return {
            status: 500,
            message: 'Internal server error.',
        };
    }
};
