// src/routes/authRoutes.ts

import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { check } from 'express-validator';

const router = Router();

// Registration route
router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    ],
    registerUser
);

// Login route
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    loginUser
);

export default router;
