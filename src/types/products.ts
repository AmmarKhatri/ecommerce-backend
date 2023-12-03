export const products = `#graphql
    #adding a new address
    type Product {
        id: Int!
        seller_id: Int!
        name: String!
        description: String!
        image_url: String!
        price: Float!
        quantity: String!
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
    #get addresses list
    type GetEnlistedProductsResponse {
        status: Int!
        message: String!
        products: [Product!]
    }
    extend type Query{
        # different category products return
        getEnlistedProducts: GetEnlistedProductsResponse!
    }
    extend type Mutation {
        enlistProduct(input: EnlistProduct): EnlistProductResponse!
        delistProduct(input: DelistProduct): DelistProductResponse!
    }
`