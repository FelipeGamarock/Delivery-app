const { Sale, Product } = require('../database/models');
const serviceLogin = require('./login');

module.exports = {
  async findAll() {
    const resultGetAllSale = await Sale.findAll({
      include: [
        { model: Product, as: 'products', through: { attributes: [] } },
      ],
    });

    if (!resultGetAllSale) return { status: 404, message: 'Sales not found' };

    const resultSaleData = await Promise.all(resultGetAllSale.map(async (sale) => {
      const { sellerId } = sale.dataValues;
      const sellerName = await serviceLogin.findById(sellerId);
      const saleData = { sale, sellerName };
      return saleData;
    }));

    return { status: 200, resultSaleData };
  },

  async create(dataSale) {
    await Sale.create(dataSale);

    return { status: 201 };
  },
};
