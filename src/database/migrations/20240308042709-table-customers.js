'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
      },
      cpf: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
      },
      zipcode: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      street: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      number: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      district: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      state: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  },
};
