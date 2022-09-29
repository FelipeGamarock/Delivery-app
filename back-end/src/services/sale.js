const { User, Sale, Product, SaleProduct } = require('../database/models');
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

  async create(dataSale, userId) {
    const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = dataSale;

    const { id } = await Sale.create({
      userId: userId.id,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber, 
    });
    
    if (!id) return { status: 404, message: 'id not found' };
    
    const productList = products.map((p) => ({ 
      ...p,
      saleId: id, 
    }));
    
    await SaleProduct.bulkCreate(productList);

    return { status: 201, id };
  },

  async findById(id) {
    const resultSaleById = await Sale.findOne({ 
      where: { id },
      include: [
        { model: Product, as: 'products' },
        { model: User, as: 'seller', attributes: { exclude: ['password', 'email', 'role'] } },
      ], 
  });

    if (!resultSaleById) return { status: 404, message: 'Sale not found' };

    return { status: 200, resultSaleById };
  },

  async updateSale(status, id) {
    await Sale.update(
      { status },
      { where: { id } },
    );
    return { statusCode: 200, message: 'Status was updated' };
  },
};
