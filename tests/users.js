'use strict';
const app = require('../backend.js');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));
const tester = chai.request(app);

// Our app

// before(function(done){
//     return tester.get('/init')
//     .then(res=>res)
// })

describe('API endpoint /users', function() {
    this.timeout(50000); // How long to wait for a response (ms)

    it('should drop schema and create a new one with test data', () => {
        return tester.get('/init')
        .then(res => {
            expect(res).to.have.status(200);
        })
    })

    // GET - List all colors
    it('should list all users', function() {
        return tester.get('/api/users')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.lengthOf(20);
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

    //GET a user

    it('should get 1 user', function() {

        return tester.get('/api/users/2')
        .then(res=>{
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.first_name).to.equal('Sara');
        })
    })

    it('should return 404 for user that doesn\'t exist', ()=>{
        return tester.get('/api/users/6')
        .then(res => res)
        .catch(err =>{
            expect(err).to.have.status(404);
        })
    })

    // POST - Add new user
    it('should add new user', function() {
        return tester
            .post('/api/users')
            .send({
                first_name: 'Miguel',
                last_name:'Coder',
                address: '1234 Somewhere in.',
                city:'Medford',
                state:'OR',
                zip: '97504'

            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.first_name).to.equal('Miguel');
            });
    });

    // POST - Invalid Field
    it('should fail a post with invalid fields', function() {
        return tester.post('/api/users')
            .send({
                first_name: 'legume',
                last_name:'sandwich',
                address:'1234 something rd.',
                city:'paris',
                state:'france',
                zip:'12345',
                invalid_field:'should throw error'
            })
            .then(function(res) {
                throw new Error('Invalid content type!');
            })
            .catch(function(err) {
                expect(err.status).to.equal(412);
                expect(err.response.text).to.equal('invalid_field is not a valid input.')
            });
    });

    it('should fail a post with invalid first name', function() {
        return tester.post('/api/users')
            .send({
                first_name: 'legume1',
                last_name:'sandwich',
                address:'1234 something rd.',
                city:'paris',
                state:'france',
                zip:'12345',
            })
            .then(function(res) {
                throw new Error('Invalid content type!');
            })
            .catch(function(err) {
                expect(err.status).to.equal(412);
                expect(err.response.text).to.equal('legume1 is not a valid first name')
            });
    });

    it('should fail a post with invalid last name', function() {
        return tester.post('/api/users')
            .send({
                first_name: 'legume',
                last_name:'sandwich1',
                address:'1234 something rd.',
                city:'paris',
                state:'france',
                zip:'12345',
            })
            .then(function(res) {
                throw new Error('Invalid content type!');
            })
            .catch(function(err) {
                expect(err.status).to.equal(412);
                expect(err.response.text).to.equal('sandwich1 is not a valid last name')
            });
    });

    it('should fail a post with invalid address format', function() {
        return tester.post('/api/users')
            .send({
                first_name: 'legume',
                last_name:'sandwich',
                address:'1234',
                city:'paris',
                state:'france',
                zip:'12345',
            })
            .then(function(res) {
                throw new Error('Invalid content type!');
            })
            .catch(function(err) {
                expect(err.status).to.equal(412);
                expect(err.response.text).to.equal('1234 is not a valid address')
            });
    });

    it('should fail a post with invalid city format', function() {
        return tester.post('/api/users')
            .send({
                first_name: 'legume',
                last_name:'sandwich',
                address:'1234 something rd.',
                city:'paris1',
                state:'france',
                zip:'12345',
            })
            .then(function(res) {
                throw new Error('Invalid content type!');
            })
            .catch(function(err) {
                expect(err.status).to.equal(412);
                expect(err.response.text).to.equal('paris1 is not a valid city')
            });
    });

    it('should fail a post with invalid state format', function() {
        return tester.post('/api/users')
            .send({
                first_name: 'legume',
                last_name:'sandwich',
                address:'1234 something rd.',
                city:'paris',
                state:'france2',
                zip:'12345',
            })
            .then(function(res) {
                throw new Error('Invalid content type!');
            })
            .catch(function(err) {
                expect(err.status).to.equal(412);
                expect(err.response.text).to.equal('france2 is not a valid state')
            });
    });

    it('should fail a post with invalid zip code', function() {
        return tester.post('/api/users')
            .send({
                first_name: 'legume',
                last_name:'sandwich',
                address:'1234 something rd.',
                city:'paris',
                state:'france',
                zip:'123457',
            })
            .then(function(res) {
                throw new Error('Invalid content type!');
            })
            .catch(function(err) {
                expect(err.status).to.equal(412);
                expect(err.response.text).to.equal('123457 is not a valid zip code')
            });
    });

    it('should update an existing user', function(){
        return tester.put('/api/users/1')
        .send({
            first_name:'Sean'
        })
        .then((res)=>{
            expect(res.body.first_name).to.equal('Sean');
        })
    })

    it('should delete an existing user', function(){
        return tester.delete('/api/users/2')
        .then((res)=>{
            expect(res).to.have.status(200);
        })
    })

    it('should return 404 for delete of non-existing user', function(){
        return tester.delete('/api/users/6')
        .then(res=>res)
        .catch(err=>{
            expect(err.response.text).to.equal('Not found.')
        })
    })

});
