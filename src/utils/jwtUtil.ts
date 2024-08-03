// src/utils/jwtUtil.ts

import jwt from 'jsonwebtoken';

// Secret key for signing JWTs, should be stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

// Function to generate a JWT token
export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify a JWT token
export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};
