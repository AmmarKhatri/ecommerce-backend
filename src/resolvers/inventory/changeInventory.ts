import { validateToken } from '../../helpers/validateToken.js';
export const changeInventory = async (_: any, { input }: any, context: any) => {
    const { product_id, quantity } = input;
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
      const sellerId = await context.db.query(
        'SELECT p.seller_id from products p join product_inventory pi on p.id = pi.product_id where pi.product_id = $1;',
        [product_id]
      );
      if (payload.role !== 'seller' || sellerId.rows[0].seller_id !== payload.id){
        return {
          status: 409,
          message: `Unauthorizaed: Cannot change inventory`,
        };
      }
      // update inventory
      await context.db.query(
        'UPDATE product_inventory SET quantity = $1 where product_id = $2',
        [quantity, product_id]
      );
      return {
        status: 201,
        message: `Successfully updated inventory`,
      };
    } catch (error) {
      console.error('Error updating inventory:', error);
      return {
        status: 500,
        message: 'Internal server error.',
      };
    }
  };