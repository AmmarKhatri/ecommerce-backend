import { validateToken } from '../../helpers/validateToken.js';
export const fetchOrderItemsForBuyer = async (_: any, { input }: any, context: any) => {
    const { status } = input;
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
      const itemList = await context.db.query(
        `Select oi.*, p.price, p.name, p.image_url from order_total ot
        join order_items oi on ot.id = oi.order_reference
        join products p on p.id = oi.product_id
        where oi.status = $1 and ot.buyer_id = $2;`, [status, payload.id])
      return {
        status: 200,
        message: `Fetched orders`,
        orders: itemList.rows
      };
    } catch (error) {
      console.error('Error fetching order info:', error);
      return {
        status: 500,
        message: 'Internal server error.',
      };
    }
  };