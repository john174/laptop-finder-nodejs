// src/models/Laptop.ts

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database'; // Импорт конфигурации базы данных

class Laptop extends Model {
  public id!: number;
  public brand!: string;
  public model!: string;
  public cpu!: string;
  public gpu!: string;
  public ram!: number;
  public storage!: string;
  public price!: number;
  public screenSize!: number;
  public batteryLife!: number;
  public weight!: number;
}

Laptop.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gpu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ram: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  storage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  screenSize: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  batteryLife: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Laptop',
  timestamps: false,
});

export default Laptop;
