const express = require('express');

const cors = require('cors');

const { login, products, sale, users, seller, customer } = require('../routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/images', express.static('public'));

app.use(login);

app.use(sale);
app.use(products);
app.use(users);
app.use(seller);
app.use(customer);

module.exports = app;
