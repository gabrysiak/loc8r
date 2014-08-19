var ctrl = require('../app/controllers/locations');

module.exports = function(app, passport) {
    app.get('/', ctrl.homelist);
    app.get('/location', ctrl.locationInfo);
    app.get('/location/review/new', ctrl.addReview);
};