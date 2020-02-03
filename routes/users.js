const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const passport=require('passport');
const multer=require('multer');
const keys=require('../config/keys');

const userValidator=require('../validation/userValidator');
const passwordChangeValidator=require('../validation/passwordChageValidator');
const validateLoginInput=require('../validation/login');
const User=require('../models/User');
const router=express.Router();


const storage=multer.diskStorage({
	destination:function(req, file , cb){
		cb(null , './uploads/')
	},
	filename:function(req, file , cb){
		cb(null , Date.now().toString()+'-'+file.originalname )
	}
})
const upload=multer({
	storage:storage,
	fileFilter:function(req, file, cb){
		if(file.mimetype==='image/jpeg' ||file.mimetype==='image/png'){
			cb(null , true)
		}else{
			cb(null , false)
		}
	},
	limits:{fileSize:1024*1024*5}
})
router.post('/register',upload.single('file'), (req, res)=>{
	const verify= userValidator(req)
	if(!verify.isValid ){
		return res.status(400).json(verify.errors)
	}
	User.findOne({email:req.body.email})
	.then(user=>{
		if(user){
			return res.status(400).json({email:"user  exist"})
		}else{
			bcrypt.hash(req.body.password, 12,((err, hash)=>{
				if(err){
					console.log(err)
					res.status(500).json({massage:"Server error occurd "})
				}else{
					// const day= new Date()
					// const dd= day.getDate()
					// const mm= day.getMonth()+1
					// const yy= day.getFullYear()
					// const newDate= dd+'-'+mm+'-'+yy
					const newUser=  new User({
						avatar:req.file.path,
						firstName:req.body.firstName,
						lastName:req.body.lastName,  
						email:req.body.email,
						phone:req.body.phone,
						address:req.body.address,
						city:req.body.city,
						state_name:req.body.state_name,
						zipcode:req.body.zipcode,
						account_description:req.body.account_description,
						job_title:req.body.job_title,
						password:hash
					})
					newUser.save()
					.then(user=>{
						console.log(user)
						res.json({massage:"user created success full "})
					})
					.catch(err=>{
						console.log(err)
					})
				}
			}))
		}
	})
	.catch(err=>{
		console.log(err)
		res.json({massage:"server error occurd "})
	})
})
router.post('/login',(req,res)=>{
	const {errors, isValid}=validateLoginInput(req.body);

    if(!isValid){
    	return res.status(400).json(errors);
    }

	const email=req.body.email;
	const password=req.body.password;
	User.findOne({email})
	.then(user=>{
		if(!user){
			errors.email='User not found';
		    return	res.status(404).json(errors);
		}

		bcrypt.compare(req.body.password, user.password)
		.then(isMatch=>{
			if(!isMatch){
				return res.status(500).json({massage:"Wrong password provided "})
			}
			console.log(user)

			let token = jwt.sign({
			}, 'secret' , {expiresIn:"4h"})
			let userData={
				
				avatar:user.avatar,
				phone:user.phone,
				address:user.address,
				city:user.city,
				state_name:user.state_name,
				zipcode:user.zipcode,
				account_description:user.account_description,
				job_title:user.job_title,
				first_name:user.firstName,
				last_name:user.lastName,
				email:user.email,
				_id:user._id
			}
			res.status(200).json({massage:"Login successfull", token:token, userData:userData})
		})
	})
	.catch(err=>{
		console.log(err)
		res.json({err:err})
	})
});
 
 
router.post('/updateProfile/:id' , (req,res)=>{
	const {oldPassword , newPassword , newPassword2, firstName , lastName , email }=req.body
	const verify= passwordChangeValidator(req.body)
	if(!verify.isValid ){
		return res.status(400).json(verify.errors)
	}
	User.findByIdAndUpdate({_id:req.params.id})
	.then(user=>{
		bcrypt.compare(req.body.oldPassword , user.password , (err , result)=>{
			if(err){
				return res.status(400).json({massage:"Error occure while changing password"})
			} 
			if(!result){
				return res.status(400).json({massage:"Wrong password provided"})
			}
			bcrypt.hash(newPassword ,12 , (err , hash)=>{
				if(err){ 
					return res.json({massage:"server error "})
				}
				user.password=hash,
				user.firstName=firstName, 
				user.lastName=lastName, 
				user.email=email,
				user.save()
				.then(data =>{
					return res.status(200).json({done:"Profile update  successfull"})
				})
				.catch(err=>{
					console.log(err)
					return res.status(200).json({massage:"Server error occurd"})
				})
			} )
		})

	})
	.catch(err=>{
		console.log(err)
		res.json({err:err})
	})
})
module.exports=router;
