import { Request, Response } from 'express';
import { customerService } from '../services/customerService';

export const customerController = {
  create: async (req: Request, res: Response) => {
    const { name, email, cpf, zipcode, street, number, district, city, state } =
      req.body;

    try {
      const customerExist = await customerService.findByEmail(email);

      if (customerExist) {
        return res.status(400).json({ message: `Email is already in use.` });
      }

      const cpfExist = await customerService.findByCpf(cpf);

      if (cpfExist) {
        return res.status(400).json({ message: `CPF already in use.` });
      }

      const customer = await customerService.save({
        name,
        email,
        cpf,
        zipcode,
        street,
        number,
        district,
        city,
        state,
      });

      return res.status(201).json(customer);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  update: async (req: Request, res: Response) => {
    const customerId = +req.params.id;
    const { name, email, cpf, zipcode, street, number, district, city, state } =
      req.body;

    try {
      const customer = await customerService.findById(customerId);

      if (!customer) {
        return res
          .status(404)
          .json({ message: `Customer ${customerId} not found` });
      }

      const customerCadastredEmail = await customerService.findByEmail(email);

      if (customerCadastredEmail) {
        return res.status(400).json({ message: `Email is already in use.` });
      }

      const cpfExist = await customerService.findByCpf(cpf);

      if (cpfExist) {
        return res.status(400).json({ message: `CPF already in use.` });
      }

      const alteredCustomer = await customerService.update(customerId, {
        name,
        email,
        cpf,
        zipcode,
        street,
        number,
        district,
        city,
        state,
      });

      return res.status(200).json(alteredCustomer);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  getAllCustomers: async (req: Request, res: Response) => {
    try {
      const customers = await customerService.findAllCustomers();

      return res.status(200).json(customers);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  getCustomerById: async (req: Request, res: Response) => {
    const customerId = +req.params.id;
    try {
      const customer = await customerService.findById(customerId);

      if (!customer) {
        return res
          .status(404)
          .json({ message: `Customer ${customerId} not found` });
      }

      return res.status(200).json(customer);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
