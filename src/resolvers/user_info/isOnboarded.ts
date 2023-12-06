import { validateToken } from '../../helpers/validateToken.js';
export const isOnboarded = async (_: any, __: any, context: any) => {
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
        "Select onboard from users where id = $1", 
      [payload.id])
      if (users.rows[0].onboard === false) {
        return {
            status: 404,
            message: `User not onboarded`,
          };
      }
      return {
        status: 200,
        message: `Onboarded`,
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return {
        status: 500,
        message: 'Internal server error.',
      };
    }
  };