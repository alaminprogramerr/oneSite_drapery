const passport=require('passport');
const jwt=require('jsonwebtoken');
const keys=require('../config/keys');
module.exports=(app)=>{
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    );

    app.get('/auth/google/callback', passport.authenticate('google',{ failureRedirect: "/", session: false }),(req, res)=>{
        const payload={username:req.user.username, email:req.user.email, role:req.user.role};
        jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn:3600 },
        (err,token)=>{
            res.redirect("http://localhost:3000/login?token=" +token);
        });
    })
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {
        profileFields: ['id', 'name'],
    })
    );

    app.get('/auth/facebook/callback', passport.authenticate('facebook',{ failureRedirect: "/", session: false }),(req, res)=>{
        const payload={username:req.user.username, email:req.user.email, role:req.user.role};
        jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn:3600 },
        (err,token)=>{
            res.redirect("http://localhost:3000/login?token=" +token);
        });
    })

    app.get('/auth/linkedin',
    passport.authenticate('linkedin'));

    app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function(req, res) {
        console.log(req.user)
        const payload={username:req.user.username, email:req.user.email, role:req.user.role};
        jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn:3600 },
        (err,token)=>{
            res.redirect("http://localhost:3000/login?token=" +token);
        });
    });

}