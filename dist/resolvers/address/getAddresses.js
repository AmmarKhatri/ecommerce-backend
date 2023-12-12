import { validateToken } from '../../helpers/validateToken.js';
export const getAddresses = async (_, __, context) => {
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
        // query the user
        const users = await context.db.query("select * from users u left join user_info ui on u.id = ui.id where u.id = $1", [payload.id]);
        if (users.rows.length === 0) {
            return {
                status: 404,
                message: `User not registered`,
            };
        }
        // retrieve info
        const result = await context.db.query('SELECT id, user_ref, postal_code, address_line_1 as add1, address_line_2 as add2, city, created_at, updated_at from address where user_ref = $1 and deleted_at IS NULL;', [payload.id]);
        const addresses = [...result.rows];
        for (let i = 0; i < addresses.length; i++) {
            addresses[i].created_at = addresses[i].created_at.toISOString();
        }
        return {
            status: 201,
            message: `Addresses fetched successfully`,
            addresses: addresses
        };
    }
    catch (error) {
        console.error('Error fetching addresses:', error);
        return {
            status: 500,
            message: 'Internal server error.',
        };
    }
};
