'use strict';

var ctrl = require('../app/controllers/main');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/signin');
}

module.exports = function (app, passport) {
    
    /* GET About Page */
    app.get('/about', ctrl.about);
    
    /* GET Profile Page */
    app.get('/profile', isAuthenticated, ctrl.profile);

    /* GET Signin Page */
    app.get('/signin', ctrl.signin);
    
    /* Handle Login POST */
    app.post('/signin', passport.authenticate('signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash : true  
    }));

    /* GET Registration Page */
    app.get('/signup', ctrl.signup);

    /* Handle Registration POST */
    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash : true  
    }));

    /* Handle Logout */
    app.get('/signout', ctrl.signout);

};