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
        first_name: String
        last_name: String
        role: String!
    }
    #CREATE USERINFO
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
    #GETTERS INFO
    input FetchUserPublicInfo {
        user_id: Int!
    }
    type FetchUserPublicInfoResponse {
        status: Int!
        message: String!
        public_info: PublicUserInfo
    }
    type FetchUserPrivateInfoResponse {
        status: Int!
        message: String!
        private_info: PrivateUserInfo
    }
    #EDIT USER INFO
    input EditUserInfo {
        first_name: String
        last_name: String
        phone_number: String
        dob: String
    }
    type isOnboardedResponse {
        status: Int!
        message: String!
    }
    type Query {
        fetchUserPublicInfo(input: FetchUserPublicInfo): FetchUserPublicInfoResponse!
        fetchUserPrivateInfo: FetchUserPrivateInfoResponse!
        isOnboarded: isOnboardedResponse!
        
    }
    extend type Mutation {
        addUserInfo(input: AddUserInfo): AddUserInfoResponse!
        editUserInfo(input: EditUserInfo): FetchUserPrivateInfoResponse!
    }
`