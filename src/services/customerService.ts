import { Customer, CustomerCreationAttributes } from '../models/Customer';

export const customerService = {
  findByEmail: async (email: string) => {
    const customer = Customer.findOne({ where: { email } });

    return customer;
  },
  findByCpf: async (cpf: string) => {
    const customer = Customer.findOne({ where: { cpf } });

    return customer;
  },

  save: async (customer: CustomerCreationAttributes) => {
    const newProduct = Customer.create(customer);

    return newProduct;
  },
};
