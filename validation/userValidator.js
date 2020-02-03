const validator=require('validator');
const isEmpty = require('./is-empty');

module.exports=function userValidator(req){
	let errors={};
	console.log(req.file)
	if(!req.file){
		errors.image='Please select a prfile picture '
	}
	if(!req.body.firstName){
		errors.firstName='First name is required';
	}

	if(!req.body.lastName){
		errors.lastName='Last name is required';
	}

	if(!req.body.email){
		errors.email='Email is required';
	}else if(!validator.default.isEmail(req.body.email)){
		errors.email='Email is invalid';
	}
	
	if(!req.body.phone){
		errors.phone='Phone number is required';
	}

	if(!req.body.address){
		errors.address='Address   is required';
	}

	if(!req.body.city){
		errors.city='City name is required';
	}

	if(!req.body.state_name){
		errors.state_name='State   is required';
	}

	if(!req.body.zipcode){
		errors.zipcode='Zip code  is required';
	}

	if(!req.body.account_description){
		errors.account_description='Account description  is required';
	}

	if(!req.body.job_title){
		errors.job_title='Job title   is required';
	}
 
	if(!req.body.password){
		errors.password='Password is required';
	} else if(req.body.password.length<6){
		errors.password='Password must be at least 5 charaters';
	}
	if(!req.body.password2){
		errors.password2='Confirm password is required';
	}else if(req.body.password !== req.body.password2){
		errors.password2='password is not match';
	} 

	return {
		errors,
		isValid:isEmpty(errors)
	}
}
