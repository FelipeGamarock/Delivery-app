'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('salesProducts', [{
      sale_id: 1,
      product_id: 1,
      quantity: 3,
     },{
      sale_id: 1,
      product_id: 2,
      quantity: 5,
     }], {});
  },

  async down (queryInterface, _Sequelize) {
      return queryInterface.bulkDelete('salesProducts', null, {});
  }
};
