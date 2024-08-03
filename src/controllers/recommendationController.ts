// src/controllers/recommendationController.ts

import { Request, Response } from 'express';
import { evaluateLaptops } from '../services/recommendationService';

/**
 * Контроллер для генерации рекомендаций ноутбуков.
 * @param {Request} req - Объект запроса Express.
 * @param {Response} res - Объект ответа Express.
 */
async function getLaptopRecommendations(req: Request, res: Response): Promise<void> {
  try {
    const preferences = req.body; // Получаем предпочтения пользователя из тела запроса
    const recommendedLaptops = await evaluateLaptops(preferences);

    // Возвращаем топ-5 рекомендованных ноутбуков
    res.json(recommendedLaptops.slice(0, 5));
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при генерации рекомендаций' });
  }
}

export {
  getLaptopRecommendations,
};
