import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

export interface Order {
  id: number;
  customer_id: number;
  observation: number;
  total_value: number;
}

export interface OrderCreationAttributes
  extends Optional<Order, 'id' | 'observation' | 'total_value'> {}

export interface OrderInstance
  extends Model<Order, OrderCreationAttributes>,
    Order {}

export const Order = sequelize.define<OrderInstance, Order>('Order', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customer_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'customers', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  observation: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  total_value: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
});
