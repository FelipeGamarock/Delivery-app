const express = require('express');
const { login, customer } = require('../routes');

const app = express();

app.use(express.json());

app.use(login);
app.use(customer);

module.exports = app;
