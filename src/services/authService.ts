import { User } from '../models/User';
import * as hashUtil from '../utils/hashUtil';
import * as jwtUtil from '../utils/jwtUtil';

interface UserCredentials {
    email: string;
    password: string;
}

export const register = async ({ email, password }: UserCredentials) => {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    // Hash the password
    const hashedPassword = await hashUtil.hashPassword(password);

    // Create new user
    const user = await User.create({ email, password: hashedPassword });

    return user;
};

export const login = async ({ email, password }: UserCredentials) => {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await hashUtil.comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwtUtil.generateToken({ userId: user.id });

    return token;
};