const validator=require('validator');
const isEmpty = require('./is-empty');




module.exports=function userValidator(req){
	let errors={};
	console.log(req.file)
	if(!req.file){
		errors.image='Please select a prfile picture '
	}
	if(!req.body.firstName || req.body.firstName== 'undefined'){
		errors.firstName='First name is required';
	}

	if(!req.body.lastName || req.body.lastName== 'undefined' ){
		errors.lastName='Last name is required';
	}

	if(!req.body.email || req.body.email== 'undefined' ){
		errors.email='Email is required';
	}else if(!validator.default.isEmail(req.body.email)){
		errors.email='Email is invalid';
	}
	
	if(!req.body.phone || req.body.phone== 'undefined' ){
		errors.phone='Phone number is required';
	}

	if(!req.body.address || req.body.address== 'undefined' ){
		errors.address='Address   is required';
	}

	if(!req.body.city || req.body.city== 'undefined' ){
		errors.city='City name is required';
	}

	if(!req.body.state_name || req.body.state_name== 'undefined' ){
		errors.state_name='State   is required';
	}

	if(!req.body.zipcode || req.body.zipcode== 'undefined' ){
		errors.zipcode='Zip code  is required';
	}

	if(!req.body.account_description || req.body.account_description== 'undefined' ){
		errors.account_description='Account description  is required';
	}

	if(!req.body.job_title || req.body.job_title== 'undefined' ){
		errors.job_title='Job title   is required';
	}
 
	if(!req.body.password || req.body.password== 'undefined' ){
		errors.password='Password is required';
	} else if(req.body.password.length<6  ){
		errors.password='Password must be at least 5 charaters';
	}
	if(!req.body.password2 || req.body.password2== 'undefined' ){
		errors.password2='Confirm password is required';
	}else if(req.body.password !== req.body.password2 ){
		errors.password2='password is not match';
	} 

	return {
		errors,
		isValid:isEmpty(errors)
	}
}
