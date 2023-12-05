import { validateToken } from '../../helpers/validateToken.js';
export const fetchOrderByBuyer = async (_: any, { input }: any, context: any) => {
    const { id } = input;
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
      const baseInfo = await context.db.query(
        `SELECT * from order_total where id = $1;`,
        [id]
      )
      console.log(baseInfo.rows[0])
      const itemList = await context.db.query(
        `SELECT p.id as prod_id,oi.id as item_id, p.image_url, p.name, p.description,oi.quantity, price,first_name, last_name, phone_number from order_items oi
            join order_total ot on oi.order_reference = ot.id
            join products p on oi.product_id = p.id
            join user_info ui on p.seller_id = ui.id
        where ot.id = $1;`, [id])
      console.log(itemList.rows)
      let order = baseInfo.rows[0]
      order.items = itemList.rows
      order.created_at = order.created_at.toISOString()
      return {
        status: 201,
        message: `Successfully fetched order`,
        order: order
      };
    } catch (error) {
      console.error('Error fetching order info:', error);
      return {
        status: 500,
        message: 'Internal server error.',
      };
    }
  };