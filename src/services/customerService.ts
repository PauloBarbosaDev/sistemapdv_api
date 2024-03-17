import { Order } from '../models';
import { Customer, CustomerCreationAttributes } from '../models/Customer';

export const customerService = {
  getOrdersByCustomerId: async (customer_id: string | number) => {
    const orders = await Order.findAll({ where: { customer_id } });

    return orders;
  },

  findAllCustomers: async () => {
    const customers = await Customer.findAll({ order: [['id', 'ASC']] });

    return customers;
  },
  findByEmail: async (email: string) => {
    const customer = Customer.findOne({ where: { email } });

    return customer;
  },
  findByCpf: async (cpf: string) => {
    const customer = Customer.findOne({ where: { cpf } });

    return customer;
  },
  findById: async (id: number | string) => {
    const customer = await Customer.findByPk(id);

    return customer;
  },

  save: async (customer: CustomerCreationAttributes) => {
    const newProduct = Customer.create(customer);

    return newProduct;
  },
  update: async (
    id: number,
    attributes: {
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
  ) => {
    const [effectedRows, updatedCustomers] = await Customer.update(attributes, {
      where: { id },
      returning: true,
    });

    return updatedCustomers[0];
  },
};
