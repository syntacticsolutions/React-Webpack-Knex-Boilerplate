var sql = require('../sql');
var validator = require('../validator');

// define validation object parameters

const users = {
	id: { type: validator.TYPE_INT },
	first_name: { type: validator.TYPE_NAME, length: 20, required: true },
	last_name: { type: validator.TYPE_NAME, length: 20, required: true },
	address: { type: validator.TYPE_ADDRESS, length:35, required: true },
	city: { type: validator.TYPE_NAME, length: 30, required: true },
	state: { type: validator.TYPE_NAME, length: 30, required: true },
	zip: { type: validator.TYPE_ZIP, length: 5, required: true }
}

//Expose CRUD functions for endpoint.


module.exports = {
	// list all users

	list: (req, res) => {

		return sql.select().from('users')
		.then(data => {

			if(!data[0])
				return res.sendStatus(404)

			return res.status(200).json(data);
		})
	},

	//get users by id

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

	// insert or update users

	upsert: (req, res) => {
		var sql = sql.knex('users');

		// validate input
		if(!validator.validate(users, req.body)) return res.sendStatus(412);

		if(req.parms.id){ 
		//if id exists then update
			return sql.update(req.body)
			.where({id:req.params.id})

		} else 
		//if id not exists then insert
			sql = sql.insert(req.body)

		return sql.then(res => {
			res.status(200).send(req.body);
		})
	},

	delete: (req, res) => {
		return sql('users')
		.where({'id': req.params.id})
		.del()
		.then(res =>{
			if(!res)return res.sendStatus(404);
			return res.sendStatus(200);
		});
	}
}