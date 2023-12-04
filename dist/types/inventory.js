export const inventory = `#graphql
    #change inventory
    input ChangeInventory {
        product_id: Int!
        quantity: Int!
    }
    type ChangeInventoryResponse {
        status: Int!
        message: String!
    }
    extend type Mutation {
        changeInventory(input: ChangeInventory): ChangeInventoryResponse!
    }
`;
