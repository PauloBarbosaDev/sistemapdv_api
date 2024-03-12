import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

export interface Customer {
  id: number;
  name: string;
  email: string;
  cpf: string;
  zipcode: string;
  street: string;
  number: number;
  district: string;
  city: string;
  state: string;
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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    cpf: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    zipcode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    street: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    number: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    district: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }
);
