const { Product } = require('../database/models');

module.exports = {
  async products() {    
    const resultProduct = await Product.findAll();

    if (!resultProduct) return { status: 404, message: 'Products not found' };

    return { status: 200, resultProduct };
  },
};
