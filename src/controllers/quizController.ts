// src/controllers/quizController.ts

import { Request, Response } from 'express';
import { getQuizQuestions, saveUserResponse } from '../services/quizService';

// Existing function to fetch quiz questions
export const fetchQuizQuestions = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { difficultyLevel } = req.query;
        if (!difficultyLevel) {
            return res.status(400).json({ message: 'Difficulty level is required' });
        }

        const questions = await getQuizQuestions(difficultyLevel as string);
        return res.status(200).json({ questions });
    } catch (error) {
        // Handle errors and assert the error type
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        console.error('Error in fetchQuizQuestions:', error);
        return res.status(500).json({ message: 'Failed to fetch quiz questions', error: errorMessage });
    }
};

// Controller function to handle quiz response submission
export const submitQuizResponses = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId, responses } = req.body;

        // Validate the incoming request
        if (!userId || !Array.isArray(responses) || responses.length === 0) {
            return res.status(400).json({ message: 'Invalid request data' });
        }

        // Iterate over the responses and save each one
        const results = [];
        for (const { quizQuestionId, response } of responses) {
            if (!quizQuestionId || typeof response !== 'string') {
                return res.status(400).json({ message: 'Invalid response data' });
            }

            const userResponse = await saveUserResponse(userId, quizQuestionId, response);
            results.push(userResponse);
        }

        // Return the saved responses
        return res.status(201).json({ message: 'Responses submitted successfully', results });
    } catch (error) {
        // Handle errors and assert the error type
        const errorMessage = (error as Error).message || 'An unknown error occurred';
        console.error('Error in submitQuizResponses:', error);
        return res.status(500).json({ message: 'Failed to submit responses', error: errorMessage });
    }
};
