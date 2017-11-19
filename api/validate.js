var _ = require('lodash');

module.exports = {

	TYPE_INT: 'INT',

	TYPE_NAME: 'NAME',

	TYPE_ADDRESS: 'ADDRESS',

	TYPE_ZIP: 'ZIPCODE',

	validate: (model, data)=>{

		const dataKeys = data.keys();
		const modelKeys = model.keys();

		//check if there are extra values that do not belong.
		if(_.each(dataKeys, function(key){
			if(modelKeys.indexOf(key) == -1){
				return res.sendStatus(412).send('Error: ' + key + ' is not a valid input.');
			}
		}))

		_.each(model, (val, key)=>{

			if(val.type === 'INT'){
				let num = parseInt(data[key]);
				if( num < 1 || !isNAN(num)){
					return res.sendStatus(412).send('Error: ' + data[key] + ' is not a valid integer.');
				}
			}

			if(val.type === 'ADDRESS'){
				if(data[key].match(/^\s*\S+(?:\s+\S+){2}/) === null){
					return res.sendStatus(412).send('Error: ' + data[key] + ' is not a valid address.');
				}
			}

			if(val.type === 'NAME'){
				if(/^[-A-Z ]+$/i.test(data[key]) === false){
					return res.sendStatus(412).send('Error: ' + data[key] + ' is not a valid name.');
				}
			}

			if(val.type === 'ZIPCODE'){
				let strNum = data[key].toString();
				if(strNum.length < 5 || strNum.length > 5 || !isNaN(strNum)){
					return res.sendStats(412).send('Error: ' + data[key] + ' is not a valid zip code.');
				}
			}

			if(data[key].length > val.length){
				return res.sendStatus(412).send('Error: ' + key + ' must be less than ' + val.length + ' characters long.');
			}

			if(val.required) {
				if(data[key].length < 1){
					return res.sendStatus(412).send('Error: ' + key + ' cannot be empty.');
				}
			}
		})
	}
}