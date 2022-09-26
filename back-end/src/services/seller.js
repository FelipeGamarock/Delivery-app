const { Sale } = require('../database/models');

module.exports = {
  async findAll(id) {
    const resultGetAllSale = await Sale.findAll(
      { where: { sellerId: id } },
    );

    if (resultGetAllSale.length === 0) return { status: 404, message: 'Order not found' };

    return { status: 200, resultGetAllSale };
  },
};
