const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport=require('passport');
const path=require('path');
const cors = require('cors');
var session = require('express-session');
const users=require('./routes/users');
const morgan=require('morgan')


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');
require('./routes/auth')(app)

const port=process.env.PORT || 5000;


//DB config
const db=require('./config/keys').mongoURI;

//MongoDB connect
mongoose
.connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
.then(()=>console.log('MongoDB connected'))
.catch((err)=> console.log(err));


//use routes
app.use('/api/users',users);

if(process.env.NODE_ENV==='production'){
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
}
app.listen(port,()=>{
	console.log('server is running on port: '+port);
})
