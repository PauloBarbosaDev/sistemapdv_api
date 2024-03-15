'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      order_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      product_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      value: {
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
    await queryInterface.dropTable('order_products');
  },
};
