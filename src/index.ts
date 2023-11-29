import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './types/types.js';
import { resolvers } from './resolvers/resolvers.js';
import pkg from 'pg';
const { Pool } = pkg;
process.env.TZ = 'UTC'; // setting default UTC timezone


// Create a PostgreSQL connection pool
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASS,
//   port: 5432, // Default PostgreSQL port
// });

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'postgres',
  password:'iba1234',
  port: 5432, // Default PostgreSQL port  
});
let dbClient;
// Handle application exit events
process.on('beforeExit', () => {
  // Release the database client when the application is shutting down
  if (dbClient) {
    dbClient.release();
    console.log('Database connection released.');
  }
});
// // Handle application exit events
// process.on('beforeExit', () => {
//   // Release the database client when the application is shutting down
//   if (dbClient) {
//     dbClient.release();
//     console.log('Database connection released.');
//   }
// });
try {
  dbClient = await pool.connect()
  console.log("Connection to db successful")
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  interface MyContext {
    db?: any;
    req: any;
  }
    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT) || 3000},
    async context({ req, res }): Promise<MyContext> {
      return {
        db: dbClient,
        req
      };
    },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
} catch (error){
  console.log("Error connection to db: ", error)
}

