var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:7555' , function(error, response, body) {
        console.log(error);
        console.log(response);
        console.log(body);
        done();
    });
});