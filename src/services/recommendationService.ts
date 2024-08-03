// src/services/recommendationService.ts

import Laptop from '../models/Laptop';

interface Preferences {
  cpuWeight: number;
  gpuWeight: number;
  ramWeight: number;
  storageWeight: number;
  priceWeight: number;
  cpu: string;
  gpu: string;
  ram: number;
  price: number;
  storage: string;
}

/**
 * Функция для оценки ноутбуков на основе пользовательских предпочтений.
 * @param {Preferences} preferences - Предпочтения пользователя, такие как важность CPU, GPU и RAM.
 * @returns {Promise<Array>} - Возвращает список ноутбуков с их оценками.
 */
async function evaluateLaptops(preferences: Preferences): Promise<Laptop[]> {
  const laptops = await Laptop.findAll(); // Извлекаем все ноутбуки из базы данных

  // Определяем веса для каждого критерия
  const weights = {
    cpu: preferences.cpuWeight || 1,
    gpu: preferences.gpuWeight || 1,
    ram: preferences.ramWeight || 1,
    storage: preferences.storageWeight || 0.5,
    price: preferences.priceWeight || 1,
  };

  // Расчет оценок для каждого ноутбука
  const scoredLaptops = laptops.map((laptop: Laptop) => {
    const score =
      (laptop.cpu.includes(preferences.cpu) ? 1 : 0) * weights.cpu +
      (laptop.gpu.includes(preferences.gpu) ? 1 : 0) * weights.gpu +
      (laptop.ram >= preferences.ram ? 1 : 0) * weights.ram +
      (laptop.price <= preferences.price ? 1 : 0) * weights.price +
      (laptop.storage.includes(preferences.storage) ? 1 : 0) * weights.storage;

    return { ...laptop.toJSON(), score };
  });

  // Сортируем ноутбуки по убыванию оценок
  scoredLaptops.sort((a: any, b: any) => b.score - a.score);

  return scoredLaptops;
}

export {
  evaluateLaptops,
};
