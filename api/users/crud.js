var knex = require('knex');
var validate = require('validate');

// define validation object parameters

const users = {
	id: {type: validate.TYPE_INT }
	first_name: { type: validate.TYPE_STR, length: 20 },
	last_name: { type: validate.TYPE_STR, length: 20 },
	address: { type: validate.TYPE_ADDR, length:35 },
	city: { type: validate.TYPE_STR, length: 30 },
	state: { type: validate.TYPE_STR, length: 30 },
	zip: { type: validate.TYPE_INT, length: 5 }
}


module.exports = {

	list: (req, res) => {

  		res.status(200).json({success:true});
	},

	get: (req, res) => {
		res.status(200).json({success:true});
	},

	upsert: (req, res) => {
		res.status(200).json({success:true});
	},

	delete: (req, res) => {
		res.status(200).json({success:true});
	}
}