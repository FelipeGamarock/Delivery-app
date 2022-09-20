'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('SalesProducts', [{
      "sale_id": 1,
      "product_id": 1,
      quantity: 3,
     },{
      "sale_id": 1,
      "product_id": 2,
      quantity: 5,
     }], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('People', null, {});
  }
};
