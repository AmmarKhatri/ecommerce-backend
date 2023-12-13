export const getProduct = async (_: any, { input }: any, context: any) => {
    try {
      const {id} = input;
      // query the user
      const products = await context.db.query(
        `SELECT p.id, image_url, name, description, price, quantity, seller_id,
        ui.first_name || ' ' || ui.last_name as seller_name, average_rating, count from products p
        join product_inventory pi on pi.product_id = p.id
        join user_info ui on p.seller_id = ui.id
        left join average_ratings on p.id = average_ratings.id
        where p.id = $1;`, 
      [id])
      if (products.rows.length === 0){
        return {
          status: 404,
          message: `No such product`,
        }
      }
      // populate the product and change null to 0
      const resProduct = products.rows[0]
      if(resProduct.average_rating == null){
        resProduct.average_rating = 0
        resProduct.count = 0
      }
      if(resProduct.quantity==null){
        resProduct.quantity = 0
      }
      //fetch list of reviews
      const reviews = await context.db.query(
        `SELECT r.id, rating, comment, ui.first_name || ' ' || ui.last_name as buyer_name from ratings r
        join order_items oi on r.order_item_id = oi.id
        join order_total ot on oi.order_reference = ot.id
        join user_info ui on ui.id = ot.buyer_id
        where r.product_id = $1;`,
        [id]
      )
      return {
        status: 200,
        message: `Products successfully fetched`,
        product: resProduct,
        reviews: reviews.rows
      };
    } catch (error) {
      console.error('Error enlisting product:', error);
      return {
        status: 500,
        message: 'Internal server error.',
      };
    }
  };