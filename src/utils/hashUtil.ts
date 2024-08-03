// src/utils/hashUtil.ts

import bcrypt from 'bcryptjs';

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Function to compare a plain password with a hashed password
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);
};
