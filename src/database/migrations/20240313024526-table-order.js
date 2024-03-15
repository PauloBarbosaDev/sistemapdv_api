'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      observation: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      total_value: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
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
    await queryInterface.dropTable('order');
  },
};
