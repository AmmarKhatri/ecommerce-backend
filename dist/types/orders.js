export const orders = `#graphql
    #place an order
    input PlaceOrder {
        cart: [[Int]!]!
    }
    type PlaceOrderResponse {
        status: Int!
        message: String!
        order_reference: Int
    }
    #fetch order by ID
    input FetchOrderByBuyer {
        id: Int!
    }
    type OrderItem {
        prod_id: Int!
        item_id: Int!
        image_url: String!
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        first_name: String!
        last_name: String!
        phone_number: String!
    }
    type Order {
        id: Int!
        total: Float!
        buyer_id: Int!
        items: [OrderItem!]!
        created_at: String!
    }
    type FetchOrderByBuyerResponse {
        status: Int!
        message: String!
        order: Order
    }
    extend type Query {
        fetchOrderByBuyer(input: FetchOrderByBuyer): FetchOrderByBuyerResponse!
    }
    extend type Mutation {
        placeOrder(input: PlaceOrder): PlaceOrderResponse!
    }
`;
