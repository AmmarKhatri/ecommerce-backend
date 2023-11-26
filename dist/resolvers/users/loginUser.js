import bcrypt from 'bcrypt';
import { generateToken } from '../../helpers/generateToken.js';
export const loginUser = async (_, { input }, context) => {
    const { email, password } = input;
    try {
        const users = await context.db.query("Select * from users where email = $1", [email]);
        if (users.rows.length === 0) {
            return {
                status: 404,
                message: `User not registered`,
            };
        }
        // Hash the password before comparison
        const user = users.rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        //password validation
        if (!isPasswordMatch) {
            return {
                status: 401,
                message: `Invalid password`,
            };
        }
        // Create a token
        const token = generateToken(user.id, user.email, user.role);
        return {
            status: 201,
            message: `Token generated`,
            token,
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
