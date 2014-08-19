'use strict';

/*
 * GET about us page
 */

module.exports.about = function(req, res) {
    res.render('about', {
        title: 'About Loc8r',
        content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Nullam sit amet interdum magna. Morbi quis faucibus nisi. Vestibulum mollis purus quis eros adipiscing tristique. Proin posuere semper tellus, id placerat augue dapibus ornare. Aenean leo metus, tempus in nisl eget, accumsan interdum dui. Pellentesque sollicitudin volutpat ullamcorper.'
    });
};

/*
 * GET sign in page
 */

module.exports.signin = function(req, res) {
    // Redirect user to index if they are authenticated
    if (req.isAuthenticated())
        res.redirect('/');
    // Display the Login page with any flash message, if any
    res.render('signin', { message: req.flash('message') });
};

/*
 * GET signout page
 */

module.exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/*
 * GET profile page
 */

module.exports.profile = function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('profile', { user: req.user });
};

/*
 * GET Signup page
 */

module.exports.signup = function(req,res) {
    res.render('signup',{message: req.flash('message')});
};