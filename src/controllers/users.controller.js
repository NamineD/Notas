const User = require('../models/User')
const passport = require('passport')

const usersCtrl = {
    SignUpForm: (req, res) => {
        res.render('users/signUp')
    },
    SignUp:  async (req, res) => {
        //console.log(req.body);
        const errors = [];
        const {name, email, password, confirm_password} = req.body;
        if(password != confirm_password){
           errors.push({text: 'Las contraseñas no coinciden'});
        }
        if(password.length < 6){
            errors.push({text: 'La contraseña debe tener minimo 6 caracteres'});
        }
        if(errors.length > 0){
            res.render('users/signUp', {
                errors
            })
        } else {
            const emailUser = await User.findOne({email})
            if(emailUser) {
                req.flash('error_msg', 'El email ya esta en uso')
                res.redirect('signup')
            } else {
                const newUser = new User({name, email, password})
                newUser.password = await newUser.encryptPassword(password)
                await newUser.save()
                req.flash('success_msg', 'Estas registrado')
                res.redirect('signin')
            }
        }
    },
    SignInForm: (req, res) => {
        res.render('users/signIn')
    },
    logOut: (req, res) => {
        req.logout()
        req.flash('success_msg', 'Tu sesion ha sido cerrada.')
        res.redirect('/signin')
    }
};



module.exports = usersCtrl;