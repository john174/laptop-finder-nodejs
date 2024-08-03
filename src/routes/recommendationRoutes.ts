// src/routes/recommendationRoutes.ts

import express from 'express';
import { getLaptopRecommendations } from '../controllers/recommendationController';

const router = express.Router();

// Маршрут для получения рекомендаций ноутбуков
router.post('/', getLaptopRecommendations);

export default router;
