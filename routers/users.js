const express = require('express');
const route = express.Router();
const { getData, addData, deleteData } = require('../controllers/users');

route.get('/', getData);
route.post('/', addData);
route.delete('/:id', deleteData);


module.exports = route;