const express = require('express');

const cors = require('cors');
const { login, customer, sale } = require('../routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(login);
app.use(customer);
app.use(sale);

module.exports = app;
