'use strict';
const mocha = require('mocha')
const app = require('./backend.js');
const chai = require('chai');
const expect = require('chai').expect;
const describe = mocha.describe;


chai.use(require('chai-http'));
const tester = chai.request(app);

// Our app

describe('API endpoint /users', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    // GET - List all colors
    it('should return all users', function() {

        return tester.get('/api/users')

        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body.results).to.be.an('array');
        });
    });

    // GET - Invalid path
    it('should return Not Found', function() {
        return tester
            .get('/INVALID_PATH')
            .then(function(res) {
                throw new Error('Path exists!');
            })
            .catch(function(err) {
                expect(err).to.have.status(404);
            });
    });

    // POST - Add new color
    it('should add new color', function() {
        return tester
            .post('/colors')
            .send({
                color: 'YELLOW'
            })
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.results).to.be.an('array').that.includes(
                    'YELLOW');
            });
    });

    // POST - Bad Request
    it('should return Bad Request', function() {
        return tester.post('/colors')
            .send({
                color: 'YELLOW'
            })
            .then(function(res) {
                throw new Error('Invalid content type!');
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });
});