const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
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

// [0]   _json: {
//     [0]     sub: '113063788072964899782',
//     [0]     name: 'Alamin Hossen',
//     [0]     given_name: 'Alamin',
//     [0]     family_name: 'Hossen',
//     [0]     picture: 'https://lh3.googleusercontent.com/a-/AAuE7mAaF258MzIpn0KJKakc6Pq4AdDRm47TTFor4VBJgQ',
//     [0]     email: 'alaminprogramerr@gmail.com',
//     [0]     email_verified: true,
//     [0]     locale: 'en'
//     [0]   }
    


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