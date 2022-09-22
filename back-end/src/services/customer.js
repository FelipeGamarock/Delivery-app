const { Product } = require('../database/models');

module.exports = {
  async products() {    
    const product = await Product.findAll();

    if (!product) return { status: 404, message: 'Products not found' };

    const resultProduct = {
      name: product.name,
      price: product.price,
      url: product.urlImage,
    };

    return { status: 200, resultProduct };
  },
};
