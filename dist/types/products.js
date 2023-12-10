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
    extend type Query{
        # different category products return
        getEnlistedProducts: GetEnlistedProductsResponse!
        fetchProducts: TrendingLatestProducts!
        searchProducts(input: SearchProduct): SearchProductResponse!
    }
    extend type Mutation {
        enlistProduct(input: EnlistProduct): EnlistProductResponse!
        delistProduct(input: DelistProduct): DelistProductResponse!
    }
`;
