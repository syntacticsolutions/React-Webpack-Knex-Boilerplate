var path = require('path');
var sql = require('./sql');
var promise = require('bluebird');
var fs = promise.promisifyAll(require('fs'));


module.exports.init = (req, res) => {
	fs.readdir('./tables', (err, files)=>{
		promise.each(files, (file)=>{
			fs.readFile('./tables/' + file, 'utf-8', (err, text)=>{
				if(err) throw err;
				return sql.raw(text)
				.then(res =>{
					console.log(res);
				})

			});
		})
		.then(() => {
			res.sendStatus(200);
		})
	});

}