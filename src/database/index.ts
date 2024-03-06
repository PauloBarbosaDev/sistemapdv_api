import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'pdv',
  username: 'postgres',
  password: '123456',
  define: {
    underscored: true,
  },
});
