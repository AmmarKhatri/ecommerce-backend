export const user_info = `#graphql
    # categorical data
    type PrivateUserInfo {
        email: String!
        role: String!
        onboard: Boolean!
        first_name: String
        last_name: String
        phone_number: String
        dob: String
    }
    type PublicUserInfo {
        first_name: String!
        last_name: String!
        role: String!
    }
    #functions
    input AddUserInfo {
        first_name: String!
        last_name: String!
        phone_number: String!
        dob: String!
    }
    type AddUserInfoResponse {
        status: Int!
        message: String!
        private_info: PrivateUserInfo
    }
    extend type Mutation {
        addUserInfo(input: AddUserInfo): AddUserInfoResponse!
    }
`