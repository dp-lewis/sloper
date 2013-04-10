/*global require, console*/
/*jslint sloppy: true*/
var sloper = require("./app/lib/sloper.js");

console.log('Building pattern file');

// output for patterns
sloper.start('layouts/default.hbs', 'patterns', 'build', function () {
    console.log('Finished: go look in the "build" directory.');
});