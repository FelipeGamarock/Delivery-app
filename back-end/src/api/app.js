const express = require('express');
const { Users, Sales, SalesProducts } = require('../database/models')

const app = express();
app.use(express.json());
const tst = async () => {
  const aa = await SalesProducts.findAll({
    logging: console.log,
  });
  return aa
}
// tst();
app.get('/coffee', async (_req, res) => res.status(200).json(await tst()));

module.exports = app;
