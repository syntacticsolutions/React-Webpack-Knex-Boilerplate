var _ = require('lodash');

module.exports = {

	TYPE_INT: 'INT',

	TYPE_NAME: 'NAME',

	TYPE_ADDRESS: 'ADDRESS',

	TYPE_ZIP: 'ZIPCODE',

	validate: (model, data)=>{

		const dataKeys = Object.keys(data);
		const modelKeys = Object.keys(model);
		let err = false;

		//check if there are extra values that do not belong.
		if(_.each(dataKeys, function(key){
			if(modelKeys.indexOf(key) == -1){
				err = 'Error: ' + key + ' is not a valid input.';
				return false;
			}
		}))

		if(!err) {

			_.each(model, (val, key)=>{

				if(val.type === 'INT'){
					let num = parseInt(data[key]);
					if( num < 1 || !isNaN(num)){
						err = 'Error: ' + data[key] + ' is not a valid integer.';
						return false;
					}
				}

				if(val.type === 'ADDRESS'){
					if(data[key].match(/^\s*\S+(?:\s+\S+){2}/) === null){
						err = 'Error: ' + data[key] + ' is not a valid address.';
						return false;
					}
				}

				if(val.type === 'NAME'){
					if(/^[-A-Z ]+$/i.test(data[key]) === false){
						err = 'Error: ' + data[key] + ' is not a valid name.';
						return false;
					}
				}

				if(val.type === 'ZIPCODE'){
					let strNum = data[key].toString();
					if(strNum.length < 5 || strNum.length > 5 || isNaN(strNum)){
						err = 'Error: ' + data[key] + ' is not a valid zip code.';
						return false;
					}
				}

				if(data[key] && val.length && data[key].length > val.length){
					err = 'Error: ' + key + ' must be less than ' + val.length + ' characters long.';
					return false;
				}

				if(val.required) {
					if(data[key].length < 1){
						err = 'Error: ' + key + ' cannot be empty.';
						return false;
					}
				}
			})
		}
		
		if (err) return err;
		
		return true;
	}
}