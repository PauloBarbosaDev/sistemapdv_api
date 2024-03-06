import { User, UserCreationAttributes } from '../models/User';

export const userService = {
  create: async (user: UserCreationAttributes) => {
    const newUser = await User.create(user);

    return newUser;
  },
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    return user;
  },
};
