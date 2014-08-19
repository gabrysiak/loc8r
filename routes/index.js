'use strict';

module.exports = function(app, passport){
    require('./main')(app, passport);
    require('./locations')(app, passport);
};