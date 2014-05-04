var consumers = require('./consumers');
consumers.concur.trips(function(err,data){
console.log(data);
    data.forEach(function(d){console.log(JSON.stringify(d,null,4));});
    consumers.aggregate.geocodeAll(data,function(err,data){
        console.log(JSON.stringify(data,null,4));
    });
});

/*consumers.esri.geocode({text:"SFO"},function(err,result){
    console.log(result);
    console.log(JSON.stringify(result,null,4));
});*/