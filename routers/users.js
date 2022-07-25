const express = require('express');
const route = express.Router();
const { getData, addData } = require('../controllers/users');

route.get('/', getData);
route.post('/', addData);


module.exports = route;