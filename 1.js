var async = require('async');
var console = require('console');
var results = [ ];
results.push( {id:1,data:'a'} );
results.push( {id:2,data:'b'} );
results.push( {id:3,data:'c'} );
results.push( {id:4,data:'d'} );
console.log(results);

function doFind( obj, callback ) {
    setTimeout( function() {
        console.log( "finding id=" + obj.data.id );
        obj.data.length = obj.data.id % 2;
        //console.log(obj.data.length);
        callback( null, obj.data );
    }, 50 );
}

function light( obj ) {
    this.id = obj.id;
    this.data = obj.data;
    this.save = function( callback ) {
        setTimeout( function() {
            console.log( "saving id=" + obj.id );
            callback( null, this );
        }, 50 );
    };
}

var iteration = function(row,callbackDone) {
    doFind({data: row}, function (err,entry) {
        if(entry.length) {
            callbackDone();
            return console.log( 'id=' + entry.id + ' already exists');
        }
        var newEntry = new light(row);
        newEntry.save(function (err,doc) {
            console.log( 'id=' + entry.id + ' saved');
            callbackDone();
        });
    });
};

async.eachSeries(results, iteration, function (err) {
    console.log('All done');
});