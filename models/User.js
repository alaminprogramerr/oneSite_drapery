const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
	avatar:{
		type:String,
		require:true
	},
	
	phone:{
		type:String,
		require:true
	},
	address:{
		type:String, 
		require:true
	},
	city:{
		type:String,
		require:true
	},
	state_name:{
		type:String,
		require:true
	},
	zipcode:{
		type:String,
		require:true
	},
	account_description:{
		type:String,
		require:true
	},
	job_title:{
		
		type:String,
		require:true
	},
	firstName:{
		type:String,
		require:true
	},
	lastName:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true
	},

	password:{
		type:String,
		require:true
	},
},{
	collection:"users"
})

module.exports=User=mongoose.model('users',userSchema);
