// src/routes/quizRoutes.ts

import { Router } from 'express';
import { fetchQuizQuestions, submitQuizResponses } from '../controllers/quizController';

const router = Router();

// Route to fetch quiz questions based on difficulty level
router.get('/quiz', fetchQuizQuestions);

// Route to submit user responses to quiz questions
router.post('/quiz/responses', submitQuizResponses);

export default router;
