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
		if(!validate.valid(users)) return res.sendStatus(412);

		if(req.parms.id){ 
		//if id exists then update
			sql = sql.update(req.body)
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