const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const keys=require('../config/keys');

passport.serializeUser(function(user, done) {
   done(null, user);
});
passport.deserializeUser(function(user, done) {
   done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    var userData = {
        userId:profile.id,
        email: profile.emails[0].value,
        username: profile.displayName,
       };
        User.findOne({ userId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                new User(userData).save()
                    .then((user) => done(null, user));
            }
        })

})
);

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    var userData = {
        userId:profile.id,
        username: profile.displayName,
        email: profile.emails[0].value
    };
    User.findOne({ userId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                new User(userData).save()
                    .then((user) => done(null, user));
            }
        })

})
)

passport.use(new LinkedInStrategy({
    clientID: keys.linkedinClientId,
    clientSecret: keys.linkedinClientSecret,
    callbackURL: "http://localhost:5000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        var userData = {
            userId:profile.id,
            username: profile.displayName,
            email: profile.emails[0].value
        };
        User.findOne({ userId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User(userData).save()
                        .then((user) => done(null, user));
                }
            })

    });
  }
));