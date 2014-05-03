//http://trotthatglobe.com/hooks/esri

var assert = require('assert');

function wrap(obj){
    return {data:obj};
};

module.exports = function(server) {
    /*
     * Brands
     */
    server.get('/hooks/esri', function(req, res, next) {

        //assert.ifError(err);
        res.send(wrap(["world"]));
        return next();
    });
};