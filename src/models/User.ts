// src/models/User.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the User model
interface UserAttributes {
    id: number;
    email: string;
    password: string;
}

// Define the creation attributes, making the ID optional for model creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model extending the Sequelize Model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the User model with its attributes and options
User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

export { User };
