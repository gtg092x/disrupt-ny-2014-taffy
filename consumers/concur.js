var fs = require('fs'), path = require('path');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../.keys/concur.json"), 'utf8'));
var request = require('request');
var async = require('async');
var _ = require('lodash');
var xml2js = require('xml2js');

var parser = new xml2js.Parser({explicitArray: false, normalize: true, explicitRoot: false});
//var esri = require('./esri');
var util = require('util');
var normalizeArray = function (o) {
    if (!util.isArray(o))
        return [o];
    return o;
}

var citySamples = JSON.parse(fs.readFileSync(path.join(__dirname,"../data/city-codes.json"),'utf8'));


var consumer = {
    trips: function (query, cb) {
        if (!cb) {
            cb = query;
            query = query;
        }
        var summary = query.summary;
        delete query.summary;

        request.get({url: 'https://www.concursolutions.com/api/travel/trip/v1.1',qs:query,
            headers: {
                'Authorization': 'OAuth ' + config.token
            }
        }, function (error, res, body) {

            parser.parseString(body, function (err, result) {
                if (summary || !result)
                    return cb(err, result ? result.ItineraryInfo : null);
                result.ItineraryInfo=result.ItineraryInfo||[];
                async.each(result.ItineraryInfo, function (info, cb) {
                    consumer.trip(info.TripId, function (err, summary) {

                        info = _.merge(info, summary);
                        cb(err);
                    });
                }, function (err) {
                    cb(err, result ? result.ItineraryInfo : null);
                });
            });


        });
    },

    digests: function (cb) {
        request.get({url: 'https://www.concursolutions.com/api/v3.0/expense/reportdigests',
            headers: {
                'Authorization': 'OAuth ' + config.token
            }
        }, function (error, res, body) {

            parser.parseString(body, function (err, result) {
                cb(err, result ? result.Items : null);
            });


        });
    },
    stuff:function(segments){
        for(var i = 0;i<10;i++){
            var b = _.cloneDeep(_.sample(segments,1)[0]);
            b.StartCityCode = _.sample(citySamples,1)[0].code;
            b.EndCityCode = _.sample(citySamples,1)[0].code;
            segments.push(b);
        }
    },
    trip: function (id, cb) {
        request.get({url: 'https://www.concursolutions.com/api/travel/trip/v1.1/' + id,
            headers: {
                'Authorization': 'OAuth ' + config.token
            }
        }, function (error, res, body) {

            parser.parseString(body, function (err, result) {
                var trip = result;

                if (trip && trip.Bookings) {

                    trip.Bookings.Booking = normalizeArray(trip.Bookings.Booking);
                    trip.Bookings.Booking.forEach(function (booking) {
                        Object.keys(booking.Segments).forEach(function (key) {

                            booking.Segments[key] = normalizeArray(booking.Segments[key]);
                            if(key=="Air")
                                consumer.stuff(booking.Segments[key]);
                        });
                    });
                }

                //consumer.geocode(result, function () {
                    cb(err, result ? result : null);
                //});

            });


        });
    }


}

module.exports = consumer;