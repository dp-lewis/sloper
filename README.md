Sloper
====================

Assembles an "allin.html" file based on the hbs files found in the patterns directory.

The patterns files are assembled into the build directory.

Install

`npm install -g sloper`

Usage

`sloper [LAYOUT HANDLEBARS FILE] [DIRECTORY WITH HTML FRAGMENTS] [OUTPUT DIRECTORY]`

Or

`var sloper = require("sloper");

sloper.start([LAYOUT HANDLEBARS FILE], [DIRECTORY WITH HTML FRAGMENTS], [OUTPUT DIRECTORY], [CALLBACK FUNCTION]);
`