import { validateToken } from "../../helpers/validateToken.js";

export const fetchUserPrivateInfo = async (_: any, __ :any, context: any) => {
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
        } catch (error){
            return {
            status: 400,
            message: 'Invalid token',
            };
        }
        
        const users = await context.db.query(
            'Select * from users u left join user_info ui on ui.id = u.id where u.id = $1;',
            [payload.id]
        );
        // user validity checked
        if (users.rows.length === 0){
            return {
                status: 404,
                message: "User does not exist"
            }
        }
        // now send the user
        let user = users.rows[0]
        console.log('User:', user);
        return {
            status: 200,
            message: "User fetched successfully",
            private_info: {
                email: user.email,
                role: user.role,
                onboard: user.onboard,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.phone_number,
                dob: user.date_of_birth ? new Date(user.date_of_birth).toISOString().split('T')[0] : null
            }
        }
    }catch (error){
        console.error('Error registering user:', error);
        return {
            status: 500,
            message: 'Internal server error.',
        };
    }
}