const validator=require('validator');
const isEmpty = require('./is-empty');

module.exports=function passwordChageValidator(data){
	let errors={}; 
	console.log(data)
	
	if(!data.firstName){
		errors.firstName='First name is required';
	}
	if(!data.lastName){
		errors.lastName="Last Name required"
	}
	if(!data.email){
		errors.email='Email is required';
	}else if(!validator.default.isEmail(data.email)){
		errors.email =" Email is not valid"
	}
	if(!data.oldPassword){
		errors.oldPassword="Old password is required "
	}
	if(!data.newPassword){
		errors.newPassword="New password required"
	}
	if(!data.newPassword2){
		errors.newPassword2="Confirm password required"
	}
	if(data.newPassword2!==data.newPassword){
		errors.newPassword2="Password does not match both "
	}


	return {
		
		errors,
		isValid:isEmpty(errors)
	}
}
