export const getProduct = async (_: any, { input }: any, context: any) => {
    try {
      const {id} = input;
      // query the user
      const products = await context.db.query(
        `SELECT * from products p
        join product_inventory pi on pi.product_id = p.id
        left join average_ratings on p.id = average_ratings.id
        where p.id = $1;`, 
      [id])
      // populate the product
      const resProduct = [...products.rows[0]]
      const reviews = await context.db.query(
        `Select * from ratings where product_id = 1;`,
        [id]
      )
      return {
        status: 200,
        message: `Products successfully fetched`,
        products: resProduct,
        reviews: reviews
      };
    } catch (error) {
      console.error('Error enlisting product:', error);
      return {
        status: 500,
        message: 'Internal server error.',
      };
    }
  };