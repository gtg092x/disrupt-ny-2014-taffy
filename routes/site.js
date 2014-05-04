var assert = require('assert');
var qs = require('querystring');
var _ = require('lodash');
function wrap(obj) {
    return {data: obj};
};
var consumers = require('../consumers');
var cache = require('memory-cache');
module.exports = function (server) {
    /*
     * Brands
     */
    server.get('/trips-summary', function (req, res, next) {
        var requestHash='/trips-summary'+JSON.stringify(req.params);
        var cached = cache.get(requestHash);
        if(cached){
            res.send(wrap(cached))
            return next();
        }
        consumers.concur.trips(req.params, function (err, trips) {
            consumers.aggregate.geocodeAll(trips, function (err, trips) {
                assert.ifError(err);
                var result = trips.map(function (t) {

                    return _.merge(t.Bookings.Booking.map(function (b) {
                        return b.Segments;
                    }), {TripId: t.TripId, TripName: t.TripName});
                });
                cache.put(requestHash,result,1000*60);
                res.send(wrap(result));
                return next();
            });
        });

    });
    server.get('/trips', function (req, res, next) {
        consumers.concur.trips(req.params, function (err, trips) {
            consumers.aggregate.geocodeAll(trips, function (err, trips) {
                assert.ifError(err);
                res.send(wrap(trips));
                return next();
            });

        });

    });
};