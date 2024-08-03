import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { validationResult } from 'express-validator';

// Helper function to get error message from unknown type
const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await authService.register({ email, password });

        return res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        return res.status(500).json({ message: 'Registration failed', error: errorMessage });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const token = await authService.login({ email, password });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        return res.status(401).json({ message: 'Login failed', error: errorMessage });
    }
};
