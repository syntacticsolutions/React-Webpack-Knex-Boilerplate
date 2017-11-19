var sql = require('../sql');
var validate = require('../validate');

// define validation object parameters

const users = {
	id: {type: validate.TYPE_INT },
	first_name: { type: validate.TYPE_STR, length: 20 },
	last_name: { type: validate.TYPE_STR, length: 20 },
	address: { type: validate.TYPE_ADDR, length:35 },
	city: { type: validate.TYPE_STR, length: 30 },
	state: { type: validate.TYPE_STR, length: 30 },
	zip: { type: validate.TYPE_INT, length: 5 }
}

//Expose CRUD functions for endpoint.


module.exports = {

	list: (req, res) => {

		return sql.select().from('users')
		.then(data => {

			if(!data[0])
				return res.sendStatus(404)

			return res.status(200).json(data);
		})
  		
	},

	get: (req, res) => {
		return sql.select('*')
		.from('users')
		.where({
			'id':req.params.id
		})
		.then(data =>{

			if(!data[0]) return res.sendStatus(404);

			return res.status(200).send(data[0]);
		})
	},

	upsert: (req, res) => {
		res.status(200).json({success:true});
	},

	delete: (req, res) => {
		res.status(200).json({success:true});
	}
}