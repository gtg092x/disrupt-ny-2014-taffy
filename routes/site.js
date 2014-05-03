var assert = require('assert');
var qs = require('querystring');
var _ = require('lodash');
function wrap(obj) {
    return {data: obj};
};
var consumers = require('../consumers');
module.exports = function (server) {
    /*
     * Brands
     */
    server.get('/trips-summary', function (req, res, next) {
        consumers.concur.trips(req.params, function (err,trips) {
            assert.ifError(err);
            var result= trips.map(function(t){

                return _.merge(t.Bookings.Booking.map(function(b){
                    return b.Segments;
                }),{TripId: t.TripId,TripName: t.TripName});
            });
            res.send(wrap(result));
            return next();
        });

    });
    server.get('/trips', function (req, res, next) {
        consumers.concur.trips(req.params, function (err,trips) {
            assert.ifError(err);
            res.send(wrap(trips));
            return next();
        });

    });
};