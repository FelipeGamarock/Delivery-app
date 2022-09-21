const express = require('express');
const { User, Product, Sale, SaleProduct } = require('../database/models');

const app = express();

app.use(express.json());

const tst = async () => {
  const user = await User.findAll({
    logging: console.log,
  });
  const product = await Product.findAll({
    logging: console.log,
  });
  const sale = await Sale.findAll({
    logging: console.log,
  });
  const saleProduct = await SaleProduct.findAll({
    logging: console.log,
  });

  return { user, product, sale, saleProduct };
};

app.get('/coffee', async (_req, res) => res.status(200).json(await tst()));

module.exports = app;
