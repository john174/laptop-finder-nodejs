// src/models/UserResponse.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { QuizQuestion } from './QuizQuestion';

// Define the attributes for the UserResponse model
interface UserResponseAttributes {
    id: number;
    userId: number;
    quizQuestionId: number;
    response: string;
    isCorrect: boolean;
}

// Define the creation attributes, making the ID optional for model creation
interface UserResponseCreationAttributes extends Optional<UserResponseAttributes, 'id'> {}

// Define the UserResponse model extending the Sequelize Model class
class UserResponse extends Model<UserResponseAttributes, UserResponseCreationAttributes> implements UserResponseAttributes {
    public id!: number;
    public userId!: number;
    public quizQuestionId!: number;
    public response!: string;
    public isCorrect!: boolean;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the UserResponse model with its attributes and options
UserResponse.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        quizQuestionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: QuizQuestion,
                key: 'id',
            },
        },
        response: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserResponse',
        tableName: 'user_responses',
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Define associations
UserResponse.belongsTo(User, { foreignKey: 'userId' });
UserResponse.belongsTo(QuizQuestion, { foreignKey: 'quizQuestionId' });

export { UserResponse };
