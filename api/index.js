const routes = require('express').Router();

routes.use('/users', require('./users'));
routes.get('/init', require('./db_init').init);

module.exports = routes;