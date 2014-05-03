var fs = require('fs'), path = require('path');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../.keys/concur.json"), 'utf8'));
var request = require('request');

var xml2js = require('xml2js');

var parser = new xml2js.Parser();

module.exports = {
    itinerary: function (cb) {
        request.get({url: 'https://www.concursolutions.com/api/travel/trip/v1.1',
            headers: {
                'Authorization': 'OAuth ' + config.token
            }
        }, function (error, res, body) {

            parser.parseString(body, function (err, result) {
                cb(err,result?JSON.stringify(result):null);
            });


        });
    }


}