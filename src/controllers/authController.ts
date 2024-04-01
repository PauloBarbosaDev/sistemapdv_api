import { userService } from '../services/userService';
import { Request, Response } from 'express';
import { jwtService } from '../services/jwtServices';

export const authController = {
  register: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
      const userAlreadyExists = await userService.findByEmail(email);

      if (userAlreadyExists) {
        return res.status(400).json({ message: `Email is already in use.` });
      }

      const user = await userService.create({ name, email, password });
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(400).json({ message: `Email not registered` });
      }

      user.checkPassword(password, (err, isSame) => {
        if (err) return res.status(400).json({ message: err.message });
        if (!isSame)
          return res
            .status(401)
            .json({ message: `invalid email and/or password` });

        const payLoad = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        const token = jwtService.generateToken(
          payLoad,
          process.env.JWT_EXPIRES || '1d'
        );

        return res.status(200).json({ authenticated: true, ...payLoad, token });
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  },
};
