import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { userService } from '../services/userService';

export const usersController = {
  getuserDetail: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userInfo = req.user;
      return res.status(200).json(userInfo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;
    const { name, email } = req.body;
    try {
      const user = await userService.findByEmail(email);

      if (user) {
        return res.status(404).json({ message: `Email já se encontra em uso` });
      }

      const updateUser = await userService.update(id, {
        name,
        email,
      });

      return res.json(updateUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  updatePassword: async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!user) {
      return res.status(401).json({ message: `Não autorizado` });
    }

    try {
      user.checkPassword(currentPassword, async (err, isSame) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        if (!isSame) {
          return res.status(400).json({ message: `Senha incorreta` });
        }

        await userService.upatePassword(user.id, newPassword);
        return res.status(204).send();
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
