import { validateToken } from '../../helpers/validateToken.js';
import { millisecondsToTimestamp } from '../../helpers/convertTimestamp.js';
export const editUserInfo = async (_, { input }, context) => {
    const { first_name, last_name, phone_number, dob } = input;
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
    var myString = "";
    if (first_name) {
        myString = myString + "first_name = '" + first_name + "',";
    }
    if (last_name) {
        myString = myString + "last_name = '" + last_name + "',";
    }
    if (phone_number) {
        myString = myString + "phone_number = '" + phone_number + "',";
    }
    if (dob) {
        myString = myString + "date_of_birth = '" + dob + "',";
    }
    console.log("My string: ", myString);
    myString = myString.slice(0, -1); // getting rid of last comma
    console.log("My string: ", myString);
    const execTime = millisecondsToTimestamp(Date.now()); // update timing
    await context.db.query('Update user_info SET ' + myString + ', updated_at = $1 where id = $2', [execTime, payload.id]);
    const users = await context.db.query('Select * from users u left join user_info ui on ui.id = u.id where u.id = $1;', [payload.id]);
    // user validity checked
    if (users.rows.length === 0) {
        return {
            status: 404,
            message: "User does not exist"
        };
    }
    // now send the user
    let user = users.rows[0];
    console.log('User:', user);
    return {
        status: 200,
        message: "User updated successfully",
        private_info: {
            email: user.email,
            role: user.role,
            onboard: user.onboard,
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
            dob: user.date_of_birth ? new Date(user.date_of_birth).toISOString().split('T')[0] : null
        }
    };
};
