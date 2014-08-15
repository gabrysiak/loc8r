'use strict';

/*
 * GET about us page
 */

module.exports.about = function(req, res) {
    res.render('about', { title: 'About' });
};

/*
 * GET sign in page
 */

module.exports.signin = function(req, res) {
    res.render('signin', { title: 'Sign in' });
};