import { userService } from '../services/userService';
import { Request, Response } from 'express';

export const authController = {
  register: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
      const userAlreadyExists = await userService.findByEmail(email);

      if (userAlreadyExists) {
        throw new Error('Este email já está cadastrado.');
      }

      const user = await userService.create({ name, email, password });
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },
};
