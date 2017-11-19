var _ = require('lodash');

module.exports = {

	TYPE_INT: 'INT',

	TYPE_NAME: 'NAME',

	TYPE_ADDRESS: 'ADDRESS',

	TYPE_ZIP: 'ZIPCODE',

	validate: (model, data)=>{

		const dataKeys = Object.keys(data);
		const modelKeys = Object.keys(model);

		//check if there are extra values that do not belong.
		if(_.each(dataKeys, function(key){
			if(modelKeys.indexOf(key) == -1){
				return 'Error: ' + key + ' is not a valid input.';
			}
		}))

		_.each(model, (val, key)=>{

			if(val.type === 'INT'){
				let num = parseInt(data[key]);
				if( num < 1 || !isNaN(num)){
					return 'Error: ' + data[key] + ' is not a valid integer.';
				}
			}

			if(val.type === 'ADDRESS'){
				if(data[key].match(/^\s*\S+(?:\s+\S+){2}/) === null){
					return 'Error: ' + data[key] + ' is not a valid address.';
				}
			}

			if(val.type === 'NAME'){
				if(/^[-A-Z ]+$/i.test(data[key]) === false){
					return 'Error: ' + data[key] + ' is not a valid name.';
				}
			}

			if(val.type === 'ZIPCODE'){
				let strNum = data[key].toString();
				if(strNum.length < 5 || strNum.length > 5 || isNaN(strNum)){
					return 'Error: ' + data[key] + ' is not a valid zip code.';
				}
			}

			if(data[key] && val.length && data[key].length > val.length){
				return 'Error: ' + key + ' must be less than ' + val.length + ' characters long.';
			}

			if(val.required) {
				if(data[key].length < 1){
					return 'Error: ' + key + ' cannot be empty.';
				}
			}
		})

		return true;
	}
}