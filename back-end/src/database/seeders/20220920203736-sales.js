'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Sales', [{
      "user_id": 1,
      "seller_id": 2,
      "total_price": 3.89,
      "delivery_address": 'rua',
      "delivery_number": '135',
      "sale_date": new Date(),
      status: 'processado'
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sales', null, {});
  }
};
