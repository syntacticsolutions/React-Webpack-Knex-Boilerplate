const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./api/sql');

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
});
app.use('/', require('./api'));



app.listen(7555, () => {
    console.log('Server running on http://localhost:7555');
});

module.exports = app;