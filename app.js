var restify = require('restify'),_=require('lodash');
var serverInfo = {
    name: 'globetrotter',
    version: '1.0.0'
};
var server = restify.createServer(serverInfo);
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.bodyParser());

server.get('/', function (req, res, next) {
    res.send(serverInfo);
    return next();
});

var routes = require('./routes');
_.forIn(routes,function(module){
    module(server);
});

server.listen(process.env.PORT||8001, function () {
    console.log('%s listening at %s', server.name, server.url);
});