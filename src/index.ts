import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import quizRoutes from './routes/quizRoutes';
import recommendationRoutes from './routes/recommendationRoutes'; // Импорт маршрутов для рекомендаций
import userRoutes from './routes/userRoutes'; // Импорт маршрутов для управления пользователями
import sequelize from './config/database'; // Импорт конфигурации базы данных
import errorHandler from './middlewares/errorMiddleware';


dotenv.config();

const app = express();

// Middleware для обработки JSON запросов
app.use(express.json());
app.use(errorHandler);

// Регистрация маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/recommendations', recommendationRoutes); // Регистрация маршрутов для рекомендаций под /api/recommendations
app.use('/api/users', userRoutes); // Регистрация маршрутов для пользователей

const PORT = process.env.PORT || 3000;

// Подключение к базе данных и запуск сервера
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Ошибка подключения к базе данных:', error);
});
