const express = require('express');
const { login } = require('../routes');

const app = express();

app.use(express.json());

app.use(login);

module.exports = app;
