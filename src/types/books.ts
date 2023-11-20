export const books = `#graphql
    type Book {
        title: String
        author: String
    }
    type Query {
        books: [Book]
    }
`