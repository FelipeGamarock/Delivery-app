const express = require('express');

const cors = require('cors');
const { login, customer } = require('../routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(login);
app.use(customer);

module.exports = app;
