import jwt from 'jsonwebtoken';

export const validateToken = (header: string) =>{
    //const secretKey = process.env.JWT_KEY;
    const secret = '0741fdcec7a6607b694aa44546b4eafd'
    const token = header.replace('Bearer ', '');
    try {
        // Decode the token and retrieve the payload
        const decodedPayload = jwt.verify(token, secret);
        // The payload is now available in the 'decodedPayload' variable
        console.log('Decoded Payload:', decodedPayload);
        return decodedPayload
      } catch (error) {
        // Handle the case where the token is invalid or has expired
        console.error('Error decoding token:', error.message);
      }
    
}