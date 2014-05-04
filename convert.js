// node samples/sample.js

var fs = require('fs');
var csv = require('csv');
var _ = require('lodash');
// opts is optional
var opts = {};
var result=[];
csv()
    .from.path(__dirname+'/city-codes.csv', { delimiter: ',', escape: '"' })
    .to.array( function(data){
        console.log(data)
        //2 - city name
        //4 - city code
        data.forEach(function(data){
            result.push({name:data[2],code:data[4]});
        });

        fs.writeFile(__dirname+'/data/city-codes.json',JSON.stringify(result,null,4),'utf8',function(err){
            console.log(err||"Good job");
        });
    } );