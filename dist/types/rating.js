export const ratings = `#graphql
    input GiveRating {
        order_id: Int!
        product_id: Int!
        rating: Int!
        comment: String
    }
    type GiveRatingResponse {
        message: String!
        status: Int!
    }
    extend type Mutation {
        giveRating(input: GiveRating): GiveRatingResponse!
    }
    
`;
