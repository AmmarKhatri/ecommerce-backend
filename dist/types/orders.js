export const orders = `#graphql
    #place an order
    input PlaceOrder {
        address: Int!
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
    input FetchOrderItemsForBuyer {
        status: String!
    }
    type BuyerOrderItem {
        id: Int!
        product_id: Int!
        name: String!
        quantity: Int!
        address: String!
        status: String!
        order_reference: Int!
        price: Float!
        image_url: String!
    }
    type FetchOrderItemsForBuyerResponse {
        message: String!
        status: Int!
        orders: [BuyerOrderItem!]
    }
    input FetchOrderItemsForSeller {
        status: String!
    }
    type SellerOrderItem {
        id: Int!
        product_id: Int!
        name: String!
        buyer_name: String!
        quantity: Int!
        address: String!
        status: String!
        order_reference: Int!
        price: Float!
        image_url: String!
    }
    type FetchOrderItemsForSellerResponse {
        message: String!
        status: Int!
        orders: [SellerOrderItem!]
    }
    #handle order
    input HandleOrder {
        product_id: Int!
        order_id: Int!
        quantity: Int!
        deliver: Boolean!
    }
    type HandleOrderResponse {
        message: String!
        status: Int!
    }
    extend type Query {
        fetchOrderByBuyer(input: FetchOrderByBuyer): FetchOrderByBuyerResponse!
        fetchOrderItemsForBuyer(input: FetchOrderItemsForBuyer): FetchOrderItemsForBuyerResponse!
        fetchOrderItemsForSeller(input: FetchOrderItemsForSeller): FetchOrderItemsForSellerResponse!
    }
    extend type Mutation {
        placeOrder(input: PlaceOrder): PlaceOrderResponse!
        handleOrder(input: HandleOrder): HandleOrderResponse!
    }
`;
