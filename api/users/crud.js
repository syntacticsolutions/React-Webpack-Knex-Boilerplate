var sql = require('../sql');
var validator = require('../validate');
var _ = require('lodash');

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

			if(!data[0]) return res.sendStatus(404);

			_.each(data, (user)=>{
				user.zip = user.zip.toString();
			})

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

		var qry = sql.into('users');

		// validate input
		return new Promise((resolve, reject) =>{

			let valid = validator.validate(users, req.body, (req.params.id || null));
			if(valid !== true) reject(valid);
			resolve();
		})
		.then(() => {
			if(req.params.id){ 
				//if id exists then update
				qry = qry.update(req.body)
				.where({id:req.params.id});

			} else {
				//if id not exists then insert
				qry = qry.insert(req.body);
			}

			return qry.then(num => {
				if(!num[0]) // if no id is returned then it could be an update
					if(!num) return res.status(412).send('Some value was entered incorrectly.'); // if no numrows are returned then the qry has failed
				
					return sql.select('*')
					.from('users')
					.where({ id: req.params.id || num[0] }) //if it is not an update it will most certainly be an insert
					.then(data=>{

						if(!data) return res.sendStatus(500); //if there is no response that user doesn't exist
						else return res.status(200).send(data[0]); //send the user with the new ID attached to it.
					})
				})
		})
		.catch(err =>{
			return res.status(412).send(err);
		})

	},

	delete: (req, res) => {
		return sql('users')
		.where({'id': req.params.id})
		.del()
		.then(data =>{

			if(!data)return res.status(404).send("Not found.");

			return res.status(200).send("success");
		});
	}
}