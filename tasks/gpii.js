/*!
GPII Linux Personalization Framework Node.js Bootstrap

Copyright 2014 RTF-US

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

'use strict';

module.exports = function(grunt) {
    var path = require("path");
    var default_options = {
        node_modules: ".." + path.sep + "node_modules",
        universal: ".." + path.sep + "node_modules" + path.sep + "universal",
        repoURL: "git://github.com/GPII/universal.git"
    };

    grunt.loadNpmTasks("grunt-shell");

    grunt.registerTask("dedupeInfusion", "Remove duplicate copies of infusion", function () {
        var infusions = grunt.file.expand({
            cwd: default_options.node_modules
        }, "**/infusion");
        // The shortest path should always be the most shallow copy
        infusions.sort(function(a, b) {
            return a.length - b.length;
        });
        for (var i = 1; i < infusions.length; i++) {
            var toDelete = default_options.node_modules + path.sep + infusions[i];
            grunt.file.delete(toDelete, { force: true });
        }
    }); 

    grunt.registerTask("gpiiUniversal", "Fetch and Install Universal", function() {
        var options = this.options(default_options);
        var shell = grunt.config.get("shell") || {};
        var shellOptions = {
            stdout: true,
            stderr: true
        };
        shell.gitClone = {
            options: shellOptions,
            command: function() {
                var gitOptions = "";
                if (grunt.option("fastClone") === true) {
                    gitOptions += " --depth=1 "
                }
                return "git clone " + gitOptions + " " + options.repoURL + " " + options.universal;
            }
        };
        shell.npmInstall = {
            options: {
                stdout: true,
                stderr: true,
                execOptions: {
                    cwd: options.universal
                }
            },
            command: function() {
                return "npm install";
            }
        };
        grunt.config.set("shell", shell);
        grunt.file.mkdir(options.node_modules);
        grunt.task.run("shell:gitClone");
        grunt.task.run("shell:npmInstall");
        grunt.task.run("dedupeInfusion");
    });

};
