/*!
GPII Grunt Tasks' own Gruntfile

Copyright 2014 RTF-US

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

"use strict";

module.exports = function (grunt) {
  
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jsonlint");
  
    // Project configuration.
    grunt.initConfig({
        jshint: {
            src: ["tasks/**/*.js"],
            buildScripts: ["Gruntfile.js"],
            options: {
                jshintrc: true
            }
        },
        jsonlint: {
            src: ["package.json"]
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks("tasks");

};
