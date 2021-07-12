const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    //coincidir con el usuario de correos electrónico
    const user = await User.findOne({email})
    if(!user){
        return done(null, false, req.flash('error_msg', 'Datos ingresados incorrectos'));
    } else {
        // coincidir con el usuario de contraseña
        const match = await user.matchPassword(password)
        if(match) {
            //console.log(user);
            return done(null, user);
        } else {
            return done(null, false, req.flash('error_msg', 'Datos ingresados incorrectos'))
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});