import { User, UserCreationAttributes } from "../models/User";

export const userService = {
  save: async (user: UserCreationAttributes) => {
    const newUser = await User.create(user);

    return newUser;
  },
  findById: async (id: number | string) => {
    const user = await User.findByPk(id);

    return user;
  },
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    return user;
  },
  update: async (id: number, attributes: { name: string; email: string }) => {
    const [effectedRows, updatedUsers] = await User.update(attributes, {
      where: { id },
      returning: true,
    });

    return {
      id: updatedUsers[0].id,
      name: updatedUsers[0].name,
      email: updatedUsers[0].email,
    };
  },

  upatePassword: async (id: string | number, password: string) => {
    const [affectedRows, updatedUsers] = await User.update(
      {
        password,
      },
      {
        where: { id },
        individualHooks: true,
        returning: true,
      }
    );

    return updatedUsers[0];
  },
  deleteUserById: async (id: number | string) => {
    return await User.destroy({ where: { id } });
  },
};
