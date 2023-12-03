export const address = `#graphql
    #adding a new address
    type Address {
        id: Int!
        user_ref: Int!
        postal_code: Int!
        add1: String!
        add2: String
        city: String!
        created_at: String!
        updated_at: String!
    }
    input AddAddress {
        postal_code: Int!
        add1: String!
        add2: String
        city: String!
    }
    type AddAddressResponse {
        status: Int!
        message: String!
        address: Address!
    }
    #remove address
    input RemoveAddress {
        id: Int!
    }
    type RemoveAddressResponse {
        status: Int!
        message: String!
    }
    #get addresses list
    type GetAddresses {
        status: Int!
        message: String!
        addresses: [Address!]!
    }
    extend type Query{
        getAddresses: GetAddresses!
    }
    extend type Mutation {
        addAddress(input: AddAddress): AddAddressResponse!
        removeAddress(input: RemoveAddress): RemoveAddressResponse!
    }
`;
