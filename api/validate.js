var _ = require('lodash');

module.exports = {

	TYPE_INT: 'INT',

	TYPE_NAME: 'NAME',

	TYPE_ADDRESS: 'ADDRESS',

	TYPE_ZIP: 'ZIPCODE',

	validate: (model, data, id)=>{

		const dataKeys = Object.keys(data);
		const modelKeys = Object.keys(model);
		let err = false;

		//check if there are extra values that do not belong.
		if(_.each(dataKeys, function(key){
			if(modelKeys.indexOf(key) == -1){
				err = key + ' is not a valid input.';
				return false;
			}
		}))

		if(!err) {

			_.each(model, (val, key)=>{

				if(val.type === 'INT' && data[key]){
					let num = parseInt(data[key]);
					if( num < 1 || !isNaN(num)){
						err = data[key] + ' is not a valid integer.';
						return false;
					}
				}

				if(val.type === 'ADDRESS' && data[key]){
					if(data[key].match(/^\s*\S+(?:\s+\S+){2}/) === null){
						err = data[key] + ' is not a valid address';
						return false;
					}
				}

				if(val.type === 'NAME' && data[key]){
					if(/^[-A-Z ]+$/i.test(data[key]) === false){
						err = data[key] + ' is not a valid ' + key.replace('_', ' ');
						return false;
					}
				}

				if(val.type === 'ZIPCODE' && data[key]){
					let strNum = data[key].toString();
					if(strNum.length < 5 || strNum.length > 5 || isNaN(strNum)){
						err = data[key] + ' is not a valid zip code';
						return false;
					}
				}

				if(data[key] && val.length && data[key].length > val.length){
					err = key + ' must be less than ' + val.length + ' characters long.';
					return false;
				}

				if(val.required && !id && data[key]) {
					if(data[key].length < 1){
						err = key + ' cannot be empty.';
						return false;
					}
				}
			})
		}

		if (err) return err;
		
		return true;
	}
}