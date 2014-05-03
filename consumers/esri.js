var fs = require('fs'), path = require('path');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../.keys/esri.json"), 'utf8'));
var request = require('request');
var _ = require('lodash');

module.exports = {
    geocode: function (query, cb) {
        request({url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find",
            qs: _.merge(query, {f: "pjson"})}, function (err, res, body) {
            cb(err, body ? JSON.parse(body) : null);
        });
    }
}