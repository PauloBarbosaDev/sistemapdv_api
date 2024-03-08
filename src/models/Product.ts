import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

export interface Product {
  id: number;
  description: string;
  quantity_stock: string;
  value: number;
  category_id: number;
}

export interface ProductCreationAttributes extends Optional<Product, 'id'> {}

export interface ProductInstance
  extends Model<Product, ProductCreationAttributes>,
    Product {}

export const Product = sequelize.define<ProductInstance, Product>('Product', {
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
  quantity_stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  value: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  category_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
});
