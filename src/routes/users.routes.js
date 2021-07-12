const express = require('express')
const router = express.Router()

const passport = require('passport')

const usersCtrl = require('../controllers/users.controller')

// Formulario para registrarse
router.get('/signup', usersCtrl.SignUpForm);

router.post('/signup', usersCtrl.SignUp);

// Formulario para Iniciar sesion
router.get('/signin', usersCtrl.SignInForm);

router.post('/signin', 
    passport.authenticate('local-signin',
    {
        successRedirect: '/notes',
        failureRedirect: '/signin'
    }
)); 

// Cerrar Sesion
router.get('/logout', usersCtrl.logOut);


module.exports = router