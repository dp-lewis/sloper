/*jslint sloppy: true, nomen: true*/
/*global require, describe, expect, it, __dirname*/
var sloper = require('../lib/sloper.js');

describe("Sloper", function () {

    it("Should list all hbs files in a given directory", function (done) {
        sloper.listPatterns(__dirname + '/fixtures/patterns', function (patternList) {
            expect(typeof patternList).toEqual('object');
            expect(patternList.length).toEqual(2);
            done();
        });
    });

    it("should return a the layout file combined with the pattern file", function (done) {
        sloper.listPatterns(__dirname + '/fixtures/patterns', function (patternList) {
            sloper.createPage(__dirname + '/fixtures/layouts/default.hbs', patternList, function (html) {
                expect(html).toEqual('<body>\n<!-- one.hbs -->\n<div>1</div>\n\n<!-- two.hbs -->\n<div>2</div>\n</body>');
                done();
            });
        });
    });

    it("should create a HTML file", function (done) {
        sloper.createHTMLFile(__dirname + '/output', 'myfile.hbs', '<div>Dummy content</div>', function () {
            done();
        });
    });

    it("should build an allin.html file from the hbs files found in the patterns directory", function (done) {
        sloper.start(__dirname + '/fixtures/layouts/default.hbs', __dirname + '/fixtures/patterns', __dirname + '/output', function () {
            done();
        });
    });

});