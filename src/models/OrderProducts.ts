import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

export interface OrderProducts {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  value: number;
}

export interface OrderProductsCreationAttributes
  extends Optional<OrderProducts, 'id' | 'value'> {}

export interface OrderProductsInstance
  extends Model<OrderProducts, OrderProductsCreationAttributes>,
    OrderProducts {}

export const OrderProducts = sequelize.define<
  OrderProductsInstance,
  OrderProducts
>('OrderProducts', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  order_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'orders', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  product_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'products', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  value: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
});
