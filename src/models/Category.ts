import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

export interface Category {
  id: number;
  description: string;
}

export interface CategoryCreationAttributes extends Optional<Category, 'id'> {}

export interface CategoryInstance
  extends Model<Category, CategoryCreationAttributes>,
    Category {}

export const Category = sequelize.define<CategoryInstance, Category>(
  'Category',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }
);
