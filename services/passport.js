const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const MicrosoftStrategy =require('passport-microsoft').Strategy
const User =require('../models/User')

const keys=require('../config/keys');
passport.serializeUser((user, done)=>{
    done(null,user.id)
})
passport.deserializeUser((id, done)=>{
    User.findOne({id:id})
    .then(user=>{
        done(null, user)
    })
})
passport.use(
    new GoogleStrategy({
        clientID:keys.googleClientID,
        clientSecret:keys.googleCLientSecret,
        callbackURL:'/auth/google/callback',
        proxy:true
    },
    (accessToken, refrashToken, profile, done)=>{
        console.log(profile)
        User.findOne({id:profile.id})
        .then(existingUser=>{
            if(existingUser){
                done(null, existingUser)
            }else{
                new User({
                    id:profile.id,
                    firstName:profile._json.given_name,
                    lastName:profile._json.family_name,
                    email:profile._json.email,
                    avatar:profile._json.picture
                }).save()
                .then(user=>{
                    done(null, user)
                })
            }
        })
    }
    )
)

passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  
  
  // Use the MicrosoftStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and 37signals
  //   profile), and invoke a callback with a user object.
  passport.use(new MicrosoftStrategy({
    clientID: keys.microsoftClientID,
    clientSecret: keys.microsoftClientSecret,
    callbackURL: "/auth/microsoft/callback"
  },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile)
    // asynchronous verification, for effect...
    //   process.nextTick(function () {
  
    //     // To keep the example simple, the user's Microsoft Graph profile is returned to
    //     // represent the logged-in user. In a typical application, you would want
    //     // to associate the Microsoft account with a user record in your database,
    //     // and return that user instead.
    //     return done(null, profile);
    //   });
    }
  ));
  
  
  // GET /auth/microsoft
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request. The first step in Microsoft Graph authentication will involve
  //   redirecting the user to the common Microsoft login endpoint. After authorization, Microsoft
  //   will redirect the user back to this application at /auth/microsoft/callback

  
  // GET /auth/microsoft/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
 
//   app.get('/logout', function (req, res) {
//     req.logout();
//     res.redirect('/');
//   });
  
//   app.listen(3000);
  
  
  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed.  Otherwise, the user will be redirected to the
  //   login page.
//   function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) { return next(); }
//     res.redirect('/login')
//   }

// passport.use(new FacebookStrategy({
//     clientID: keys.facebookClientID,
//     clientSecret: keys.facebookClientSecret,
//     callbackURL: 'http://localhost:5000/auth/facebook/callback',
//     proxy: true
// }, (accessToken, refreshToken, profile, done) => {
//     var userData = {
//         userId:profile.id,
//         username: profile.displayName,
//         email: profile.emails[0].value
//     };
//     User.findOne({ userId: profile.id })
//         .then((existingUser) => {
//             if (existingUser) {
//                 done(null, existingUser);
//             } else {
//                 new User(userData).save()
//                     .then((user) => done(null, user));
//             }
//         })

// })
// )

// passport.use(new LinkedInStrategy({
//     clientID: keys.linkedinClientId,
//     clientSecret: keys.linkedinClientSecret,
//     callbackURL: "http://localhost:5000/auth/linkedin/callback",
//     scope: ['r_emailaddress', 'r_liteprofile']
//   },
//   function(accessToken, refreshToken, profile, done) {
//     process.nextTick(function () {
//         var userData = {
//             userId:profile.id,
//             username: profile.displayName,
//             email: profile.emails[0].value
//         };
//         User.findOne({ userId: profile.id })
//             .then((existingUser) => {
//                 if (existingUser) {
//                     done(null, existingUser);
//                 } else {
//                     new User(userData).save()
//                         .then((user) => done(null, user));
//                 }
//             })

//     });
//   }
// ));