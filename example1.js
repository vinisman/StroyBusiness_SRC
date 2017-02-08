var myCallback = function(err, data) {
    if (err) throw err; // Check for the error and throw if it exists.
    console.log('got data: '+data); // Otherwise proceed as usual.
};

var usingItNow = function(callback) {
    var myError = new Error('My custom error!');
    console.log("Begin run");
    callback(null, 'get it?'); // I send my error as the first argument.
};

usingItNow(myCallback);