import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

export interface Customer {
  id: number;
  description: string;
}

export interface CustomerCreationAttributes extends Optional<Customer, 'id'> {}

export interface CustomerInstance
  extends Model<Customer, CustomerCreationAttributes>,
    Customer {}

export const Customer = sequelize.define<CustomerInstance, Customer>(
  'Customer',
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
