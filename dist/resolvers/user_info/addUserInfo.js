import { validateToken } from '../../helpers/validateToken.js';
import { millisecondsToTimestamp } from '../../helpers/convertTimestamp.js';
export const addUserInfo = async (_, { input }, context) => {
    const { first_name, last_name, phone_number, dob } = input;
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
        // check if info already input
        console.log(users.rows);
        if (users.rows[0].onboard === true) {
            return {
                status: 409,
                message: `Info already input`,
            };
        }
        // add info
        const execTime = millisecondsToTimestamp(Date.now());
        const result = await context.db.query('INSERT INTO user_info (id, first_name, last_name, phone_number, date_of_birth, created_at, updated_at, deleted_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);', [payload.id, first_name, last_name, phone_number, dob, execTime, execTime, null]);
        // update status of user to onboard
        await context.db.query('Update users SET onboard = true where id = $1', [payload.id]);
        return {
            status: 201,
            message: `Info successfully added`,
            private_info: {
                email: users.rows[0].email,
                role: users.rows[0].role,
                onboard: users.rows[0].onboard,
                first_name,
                last_name,
                phone_number,
                dob
            },
        };
    }
    catch (error) {
        console.error('Error registering user:', error);
        return {
            status: 500,
            message: 'Internal server error.',
        };
    }
};
