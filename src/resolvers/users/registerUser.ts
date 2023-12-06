import bcrypt from 'bcrypt';
import { millisecondsToTimestamp } from '../../helpers/convertTimestamp.js';
export const registerUser = async (_: any, { input }: any, context: any) => {
    const { email, password, role } = input;
    if (email == "" || password == ""){
      return {
        status: 404,
        message: `Fill empty fields`,
      };
    }
    try {
      //check if already registered
      const users = await context.db.query(
        "Select * from users where email = $1", [email]
      )
      if (users.rows.length > 0) {
        return {
            status: 403,
            message: `User already registered.`,
          };
      }
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Use the connection pool to execute a database query
      const execTime = millisecondsToTimestamp(Date.now())
      const result = await context.db.query(
        'INSERT INTO users (email, password, role, onboard, created_at, updated_at, deleted_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [email, hashedPassword, role, false, execTime, execTime, null]
      );
  
      // Extract the newly created user's ID from the query result
      const userId = result.rows[0].id;
  
      return {
        status: 201,
        message: `User with ID ${userId} successfully registered.`,
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return {
        status: 500,
        message: 'Internal server error.',
      };
    }
  };