const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./api/sql');

app.use(express.static('dist'));
app.use(bodyParser.json());

app.use('/', require('./api'));

app.listen(7555, () => {
    console.log('Server running on http://localhost:7555');
});

module.exports = app;