'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var assetmanager = require('assetmanager');
var debug = require('debug')('passport-mongo');
var flash = require('connect-flash');
var app = express();
var passport = require('passport');
var initPassport = require('./passport/init');

require('./config/db');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
initPassport(passport);

app.use(function (req, res, next) {
  res.locals.loggedIn = req.isAuthenticated();
  next();
});

app.use(app.router);

app.set('showStackError', true);

// Enable jsonp
app.enable('jsonp callback');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development only
if ('development' === app.get('env')) {
  // app.use(express.errorHandler());
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Configure asset manager to load all assets
var assets = assetmanager.process({
    assets: require('./config/assets.json'),
    debug: (process.env.NODE_ENV !== 'production'),
    webroot: 'public'
});

// Add assets to local variables
app.locals.assets = assets;

require('./routes')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  debug('Express server listening on port ' + app.get('port'));
});
