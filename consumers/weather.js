var fs = require('fs'), path = require('path');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../.keys/weather.json"), 'utf8'));
var request = require('request');
var _ = require('lodash'),util = require('util');

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

module.exports = {
    plan: function (query, cb) {
        var dayAfter = new Date(query.day.getTime());
        dayAfter.setDate(dayAfter.getDate()+1);
        var dateStr = util.format("%s%s%s%s",
            pad(query.day.getMonth()+1,2),
            pad(query.day.getDate(),2),
            pad(dayAfter.getMonth()+1,2),
            pad(dayAfter.getDate(),2)
        );
        var url = util.format("http://api.wunderground.com/api/%s/planner_%s/q/%s.json",
            config.id,dateStr,query.city);
        //console.log(url);
        request({url: url},
             function (err, res, body) {
            cb(err, body ? JSON.parse(body) : null);
        });
    }
}