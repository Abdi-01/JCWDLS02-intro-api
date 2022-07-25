const express = require('express');
const route = express.Router();
const { getData, addData, deleteData, updateData } = require('../controllers/users');

route.get('/', getData);
route.post('/', addData);
route.patch('/:id', updateData);
route.delete('/:id', deleteData);


module.exports = route;