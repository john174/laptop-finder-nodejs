// src/services/quizService.ts

import { QuizQuestion } from '../models/QuizQuestion';
import { UserResponse } from '../models/UserResponse';

// Function to fetch quiz questions based on difficulty level (existing function)
export const getQuizQuestions = async (difficultyLevel: string) => {
    try {
        const questions = await QuizQuestion.findAll({
            where: { difficultyLevel },
        });
        return questions;
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        throw new Error('Unable to fetch quiz questions at this time');
    }
};

// Function to save a user's response to a quiz question
export const saveUserResponse = async (userId: number, quizQuestionId: number, response: string) => {
    try {
        // Retrieve the correct answer for the question from the database
        const question = await QuizQuestion.findByPk(quizQuestionId);

        if (!question) {
            throw new Error('Quiz question not found');
        }

        // Determine if the user's response is correct
        const isCorrect = question.correctAnswer === response;

        // Save the user response in the database
        const userResponse = await UserResponse.create({
            userId,
            quizQuestionId,
            response,
            isCorrect,
        });

        // Return the saved user response
        return userResponse;
    } catch (error) {
        // Handle errors
        console.error('Error saving user response:', error);
        throw new Error('Unable to save user response at this time');
    }
};
