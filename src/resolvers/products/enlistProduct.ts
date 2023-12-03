import { validateToken } from '../../helpers/validateToken.js';
import { millisecondsToTimestamp } from '../../helpers/convertTimestamp.js';
export const enlistProduct = async (_: any, { input }: any, context: any) => {
    const { name, image_url, description, quantity, price } = input;
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
            message: `User registered`,
          };
      }
      // check if info already input
      console.log(users.rows)
      if (users.rows[0].role !== 'seller'){
        return {
          status: 409,
          message: `Only seller can list products`,
        };
      }
      // check if seller is onboarded
      if (users.rows[0].onboard !== true){
        return {
          status: 409,
          message: `Please provide your info first`,
        };
      }
      // add product info
      const execTime = millisecondsToTimestamp(Date.now())
      const result = await context.db.query(
        'INSERT INTO products (seller_id, image_url, name, description, price, created_at, updated_at, deleted_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;',
        [payload.id, image_url, name, description, price, execTime, execTime, null]
      );
      // adding initial inventory
      await context.db.query(`INSERT INTO product_inventory VALUES ($1, $2);`, [result.rows[0].id, quantity])
      return {
        status: 201,
        message: `Product successfully enlisted`,
        product: {
          id: result.rows[0].id,
          seller_id: payload.id,
          name,
          description,
          image_url,
          price,
          quantity,
          created_at: execTime,
          updated_at: execTime,
        },
      };
    } catch (error) {
      console.error('Error enlisting product:', error);
      return {
        status: 500,
        message: 'Internal server error.',
      };
    }
  };