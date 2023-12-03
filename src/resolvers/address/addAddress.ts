import { validateToken } from '../../helpers/validateToken.js';
import { millisecondsToTimestamp } from '../../helpers/convertTimestamp.js';
export const addAddress = async (_: any, { input }: any, context: any) => {
    const { postal_code, add1, add2, city } = input;
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
      // query the user
      const users = await context.db.query(
        "select * from users u left join user_info ui on u.id = ui.id where u.id = $1", 
      [payload.id])
      if (users.rows.length === 0) {
        return {
            status: 404,
            message: `User not registered`,
          };
      }

      // add address
      const execTime = millisecondsToTimestamp(Date.now())
      const result = await context.db.query(
        'INSERT INTO address (user_ref, postal_code, address_line_1, address_line_2, city, created_at, updated_at, deleted_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;',
        [payload.id, postal_code, add1, add2, city, execTime, execTime, null]
      );
      return {
        status: 201,
        message: `Address successfully added`,
        address: {
          id: result.rows[0].id,
          user_ref: payload.id,
          postal_code,
          add1,
          add2,
          city,
          created_at: execTime,
          updated_at: execTime
        },
      };
    } catch (error) {
      console.error('Error adding address:', error);
      return {
        status: 500,
        message: 'Internal server error.',
      };
    }
  };