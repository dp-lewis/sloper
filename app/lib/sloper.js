/*global require, console, module */
/*jslint sloppy: true*/
var content = '',
    Handlebars = require('handlebars'),
    fs = require('fs'),
    walk = require('walk'),
    dir;

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

function createPage(layoutFile, patternFiles, onSuccess) {
    var i = 0,
        layoutCompiled,
        content = '',
        templateContent,
        compiledTemplate;

    layoutCompiled = Handlebars.compile(fs.readFileSync(layoutFile, "utf8"));

    for (i = 0; i < patternFiles.length; i = i + 1) {
        compiledTemplate = Handlebars.compile(fs.readFileSync(patternFiles[i].path, "utf8"));

        // register this file as a partial
        Handlebars.registerPartial(patternFiles[i].name, compiledTemplate({
            'title': 'test'
        }));

        content += '\n<!-- ' + patternFiles[i].name + ' -->\n{{> ' + patternFiles[i].name + '}}\n';
    }

    Handlebars.registerPartial('content', content);

    onSuccess(layoutCompiled());
}

function listPatterns(srcDir, onSuccess) {
    var walker, filePaths = [];

    walker = walk.walk(srcDir, {
        followLinks: false
    });

    walker.on("file", function (root, fileStats, next) {
        var extension = getExtension(fileStats.name);

        if (extension === '.hbs') {
            filePaths.push({
                'name': fileStats.name,
                'path': root + '/' + fileStats.name
            });
        }
        next();
    });

    walker.on("end", function () {
        onSuccess(filePaths);
    });
}

function createHTMLFile(outputDir, outputFileName, content, onSuccess) {
    fs.writeFile(outputDir + '/' + outputFileName + '.html', content, function (err) {
        if (err) {
            console.log(err);
        } else {
            onSuccess();
        }
    });
}

module.exports.start = function (layoutFile, inputDir, outputDir, onSuccess) {
    var that = this;

    // get the pattern list
    that.listPatterns(inputDir, function (patternFiles) {
        that.createPage(layoutFile, patternFiles, function (html) {
            that.createHTMLFile(outputDir, 'allin', html, function () {
                onSuccess();
            }); // end page creation
        }); // end listing patterns
    });
};

module.exports.createPage = createPage;
module.exports.listPatterns = listPatterns;
module.exports.createHTMLFile = createHTMLFile;