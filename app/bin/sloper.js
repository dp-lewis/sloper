#! /usr/bin/env node

/*global require, console*/
/*jslint sloppy: true*/
var userArgs = process.argv.slice(2), layoutFile, patternDir, sloper = require("../lib/sloper.js");



layoutFile = userArgs[0];
patternDir = userArgs[1];
exportDir = userArgs[2];

if (layoutFile && patternDir) {
  console.log('Building pattern');
  // output for patterns
  sloper.start(layoutFile, patternDir, exportDir, function () {
      console.log('Finished, go look in ' + exportDir);
  });   
} else {
  console.log('Usage: sloper [LAYOUT FILE] [PATTERN DIRECTORY] [EXPORT DIRECTORY]');
}