export const fetchProducts = async (_, __, context) => {
    // query for selective latest products
    console.log("Called fetch Products");
    try {
        const Tproducts = await context.db.query("Select * from products p join product_inventory pi on p.id = pi.product_id where p.deleted_at is null ORDER BY pi.quantity DESC Limit 4;", []);
        // check if info already input
        const trendProducts = [...Tproducts.rows];
        const Lproducts = await context.db.query("Select * from products p join product_inventory pi on p.id = pi.product_id where p.deleted_at is null ORDER BY p.created_at DESC Limit 4;", []);
        // check if info already input
        const latestProducts = [...Lproducts.rows];
        // console.log("Trending products:"+trendProducts)
        // console.log("Latest products:"+latestProducts)
        return {
            status: 200,
            message: `Products successfully fetched`,
            trending: trendProducts,
            latest: latestProducts
        };
    }
    catch (error) {
        return {
            status: 500,
            message: `Internal server error`,
        };
    }
};
