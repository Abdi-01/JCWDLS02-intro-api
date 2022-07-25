const express = require('express');
const route = express.Router();
const { getData } = require('../controllers/users');

route.get('/get', getData);


module.exports = route;