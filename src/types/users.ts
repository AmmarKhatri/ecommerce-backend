export const users = `#graphql
    #registering user types
    input RegisterUser {
        email: String!
        password: String!
        role: String!
    }
    type RegisterUserResponse {
        status: Int!
        message: String!
    }
    #login user types
    input LoginUser {
        email: String!
        password: String!
    }
    type LoginUserResponse {
        status: Int!
        message: String!
        token: String
    }
    type Mutation {
        registerUser(input: RegisterUser): RegisterUserResponse!
        loginUser(input: LoginUser): LoginUserResponse!
    }
`