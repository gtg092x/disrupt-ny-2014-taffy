var assert = require('assert');

function wrap(obj){
    return {data:obj};
};

module.exports = function(server) {
    /*
     * Brands
     */
    server.get('/hello', function(req, res, next) {

            //assert.ifError(err);
            res.send(wrap(["world"]));
            return next();
        });
};