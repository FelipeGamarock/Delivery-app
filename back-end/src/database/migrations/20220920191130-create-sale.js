'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }, 
      },
      total_price: {
        type: Sequelize.DECIMAL(9,2)
      },
      delivery_address: {
        type: Sequelize.STRING
      },
      delivery_number: {
        type: Sequelize.STRING
      },
      sale_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      status: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales');
  }
};