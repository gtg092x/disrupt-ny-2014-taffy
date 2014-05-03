
var async = require('async');
var _ = require('lodash');

var esri = require('./esri');
var concur = require('./concur');



var consumer = {
    geocodeAll:function(trips,cb){
        async.each(trips,consumer.geocodeTrip,function(err){
            cb(err,trips);
        });
    },
    geocodeTrip: function (trip, cb) {
        if (!trip || !trip.Bookings)
            return cb(null, null);

        trip.Bookings.Booking=trip.Bookings.Booking||[];
        async.each(trip.Bookings.Booking, function (booking, cb) {

            booking.Segments=booking.Segments||{};
            async.each(Object.keys(booking.Segments), function (segmentId, cb) {
                booking.Segments[segmentId] = booking.Segments[segmentId]||[];
                async.each(booking.Segments[segmentId], function (leg, cb) {

                    esri.geocode({text: leg.StartCityCode}, function (err, geo) {
                        leg.StartLocations = geo ? geo.locations : null;
                        esri.geocode({text: leg.EndCityCode}, function (err, geo) {
                            leg.EndLocations = geo ? geo.locations : null;

                            cb(err);
                        });
                    })
                }, cb);

            }, cb);
        }, function (err) {

            cb(err, trip);
        });

    }
}

module.exports=consumer;