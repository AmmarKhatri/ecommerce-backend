export const products = `#graphql
    #adding a new address
    type Product {
        id: Int!
        seller_id: Int!
        name: String!
        description: String!
        image_url: String!
        price: Float!
        quantity: Int!
        created_at: String!
        updated_at: String!
    }
    input EnlistProduct {
        name: String!
        description: String!
        image_url: String!
        quantity: Int!
        price: Float!
    }
    type EnlistProductResponse {
        status: Int!
        message: String!
        product: Product
    }
    #remove address
    input DelistProduct {
        id: Int!
    }
    type DelistProductResponse {
        status: Int!
        message: String!
    }
    #get products list
    type GetEnlistedProductsResponse {
        status: Int!
        message: String!
        products: [Product!]
    }
    # fetching trending products
    type TrendingLatestProducts {
        status: Int!
        message: String!
        trending: [Product!]
        latest: [Product!]
    }
    input SearchProduct {
        text: String!
    }
    type SearchProductResponse {
        status: Int!
        message: String!
        products: [Product!]
    }
    type PageProduct {
        id: Int!
        image_url: String!
        name: String!
        description: String!
        price: Float!
        quantity: Int!
        seller_id: Int!
        seller_name: String!
        average_rating: Float!
        count: Int!
    }
    type CustomerReviews {
        id: Int!
        rating: Int!
        comment: String
        buyer_name: String!
    }
    input GetProduct {
        id: Int!
    }
    type GetProductResponse {
        message: String!
        status: Int!
        product: PageProduct
        reviews: [CustomerReviews!]
    }
    extend type Query{
        # different category products return
        getEnlistedProducts: GetEnlistedProductsResponse!
        fetchProducts: TrendingLatestProducts!
        searchProducts(input: SearchProduct): SearchProductResponse!
        getProduct(input: GetProduct): GetProductResponse!
    }
    extend type Mutation {
        enlistProduct(input: EnlistProduct): EnlistProductResponse!
        delistProduct(input: DelistProduct): DelistProductResponse!
    }
`;
