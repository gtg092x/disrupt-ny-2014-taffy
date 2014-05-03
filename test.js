var consumers = require('./consumers');
consumers.concur.itinerary(function(err,data){
console.log(data);
});