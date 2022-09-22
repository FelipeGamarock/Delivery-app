const { Sale } = require('../database/models');

module.exports = {
  async findAll() {    
    const resultSale = await Sale.findAll();

    if (!resultSale) return { status: 404, message: 'Sales not found' };

    return { status: 200, resultSale };
  },
};
