const users = require('express').Router();
const api = require('./crud');

users.get('/', api.list);

users.get('/:id', api.get);

users.post('/', api.upsert);

users.put('/:id', api.upsert);

users.delete('/:carId', api.delete);

module.exports = users;