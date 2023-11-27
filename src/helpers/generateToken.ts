import jwt from 'jsonwebtoken';
export const generateToken = (id, email, role) => {
    //const secretKey = process.env.JWT_KEY;
    const secretKey = '0741fdcec7a6607b694aa44546b4eafd';
    // object payload
    const payload = {
        id,
        email,
        role,
    };
    // Create the JWT token with the object payload
    const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
    console.log('JWT Token:', token);
    return token;
};