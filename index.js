const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport=require('passport');
const path=require('path');
const cors = require('cors');
const users=require('./routes/users');
const morgan=require('morgan')
const cookieSession=require('cookie-session')

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(morgan('dev'))
const port=process.env.PORT || 5000;
const keys=require('./config/keys')

const db=require('./config/keys').mongoURI;
mongoose
.connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
.then(()=>console.log('MongoDB connected'))
.catch((err)=> console.log(err));


app.use(
	cookieSession({
		maxAge:30*24*60*60*1000,
		keys:[keys.cookieKey]
	})
)

app.use(passport.initialize())
app.use(passport.session())
require('./services/passport')
require('./routes/auth')(app)



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
