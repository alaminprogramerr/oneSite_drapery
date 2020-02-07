const passport =require('passport')
const jwt=require('jsonwebtoken')

module.exports=(app)=>{
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile','email']
    }))
    app.get('/auth/google/callback',passport.authenticate('google'), (req, res)=>{
        console.log(req.user)
        
        let token = jwt.sign(
            {
                _id:req.user._id,
                firstName:req.user.firstName,
                lastName:req.user.lastName,
                email:req.user.email,
                avatar:req.user.avatar
            }, 'user', {expiresIn:"7h"}
        )
        res.redirect("http://localhost:3000/login?token=" +token);
    })
    app.get('/auth/microsoft',
    passport.authenticate('microsoft'),
    function (req, res) {
      // The request will be redirected to Microsoft for authentication, so this
      // function will not be called.
    }
    );
    app.get('/auth/microsoft/callback',
    passport.authenticate('microsoft', ),
    // function (req, res) {
    //   res.redirect('/');
    // }
    );
  
    app.get('/current_user',(req, res)=>{
        console.log('current user getting ', req.user)
        res.send(req.user)
    })
    app.get('/logout', (req, res)=>{
        req.logout()
        res.redirect('/login')
    })
}