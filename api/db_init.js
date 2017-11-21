var path = require('path');
var sql = require('./sql');
var promise = require('bluebird');
var fs = promise.promisifyAll(require('fs'));
var table = require('../knexfile').connection.database;


module.exports.init = (req, res) => {
	fs.readdir('./tables', function(err, files){

		promise.map(files, function(fileName){
			return sql.raw(fs.readFileSync('./tables/' + fileName).toString().replace('{}', table)).then()
		})

		.then(done=>{
			return res.sendStatus(200);
		})
		.catch(err=>{
			console.log(err);
		})
	});

}