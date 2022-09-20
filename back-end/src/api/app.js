const express = require('express');
const { Users } = require('../database/models')

const app = express();
const tst = async () => {
  const aa = await Users.findAll();
  console.log(aa);
}
tst();
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
