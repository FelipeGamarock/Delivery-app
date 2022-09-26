const express = require('express');

const cors = require('cors');

const { login, products, sale } = require('../routes');
// const { login, customer, sale } = require('../routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/images', express.static('public'));

app.use(login);

// app.use(customer);
app.use(sale);
app.use(products);

module.exports = app;
