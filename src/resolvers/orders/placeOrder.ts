import { validateToken } from '../../helpers/validateToken.js';
export const placeOrder = async (_: any, { input }: any, context: any) => {
    const { cart } = input;
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
      if (payload.role !== 'buyer' ){
        return {
          status: 409,
          message: `Unauthorizaed: Cannot make a purchase. Not a buyer`,
        };
      }
     // Perform create order and retrieve the total
      const orderTotalResult = await context.db.query({
        text: 'SELECT create_order($1, $2) AS order_total_id',
        values: [payload.id, cart],
      });
      const orderTotalId = orderTotalResult.rows[0].order_total_id;
      return {
        status: 201,
        message: `Successfully created order`,
        order_reference: orderTotalId
      };
    } catch (error) {
      console.error('Error updating inventory:', error);
      return {
        status: 500,
        message: 'Internal server error.',
      };
    }
  };