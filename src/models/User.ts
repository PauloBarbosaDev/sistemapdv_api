import { sequelize } from '../database';
import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

type CheckPaswordCallback = (err?: Error | undefined, isSame?: boolean) => void;

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes extends Optional<User, 'id'> {}

export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {
  checkPassword: (password: string, callbackfn: CheckPaswordCallback) => void;
}

export const User = sequelize.define<UserInstance, User>(
  'User',
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
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeSave: async user => {
        if (user.isNewRecord || user.changed('password')) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      },
    },
  }
);

User.prototype.checkPassword = function (
  password: string,
  callbackfn: CheckPaswordCallback
) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err) {
      callbackfn(err);
    } else {
      callbackfn(err, isSame);
    }
  });
};
