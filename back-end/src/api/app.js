const express = require('express');

const { login, customer } = require('../routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(login);
app.use(customer);

module.exports = app;
