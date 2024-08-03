// src/models/QuizQuestion.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the QuizQuestion model
interface QuizQuestionAttributes {
    id: number;
    questionText: string;
    options: string; // JSON string or an array of options
    correctAnswer: string;
    difficultyLevel: string; // e.g., 'beginner', 'intermediate', 'advanced'
}

// Define the creation attributes, making the ID optional for model creation
interface QuizQuestionCreationAttributes extends Optional<QuizQuestionAttributes, 'id'> {}

// Define the QuizQuestion model extending the Sequelize Model class
class QuizQuestion extends Model<QuizQuestionAttributes, QuizQuestionCreationAttributes> implements QuizQuestionAttributes {
    public id!: number;
    public questionText!: string;
    public options!: string;
    public correctAnswer!: string;
    public difficultyLevel!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the QuizQuestion model with its attributes and options
QuizQuestion.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        questionText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        options: {
            type: DataTypes.JSON, // You can also use DataTypes.STRING if storing as a JSON string
            allowNull: false,
        },
        correctAnswer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficultyLevel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'QuizQuestion',
        tableName: 'quiz_questions',
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

export { QuizQuestion };
