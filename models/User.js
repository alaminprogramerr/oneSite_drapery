const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
	avatar:{
		type:String,
	},
	id:String,
	phone:{
		type:String,
	},
	address:{
		type:String, 
	},
	city:{
		type:String,
	},
	state_name:{
		type:String,
	},
	zipcode:{
		type:String,
	},
	account_description:{
		type:String,
	},
	job_title:{
		
		type:String,
	},
	firstName:{
		type:String,
	},
	lastName:{
		type:String,
	},
	email:{
		type:String,
	},

	password:{
		type:String,
	},
},{
	collection:"users"
})

module.exports=User=mongoose.model('users',userSchema);
