'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('sales', [{
      user_id: 1,
      seller_id: 2,
      total_price: 3.89,
      delivery_address: 'rua',
      delivery_number: '135',
      sale_date: new Date(),
      status: 'processado'
      }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('sales', null, {});
  }
};
