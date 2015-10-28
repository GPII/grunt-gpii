/*!
GPII Grunt shared tasks

Copyright 2014 RTF-US
Copyright 2015 RTF-I

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

"use strict";

var dedupeInfusion = require("dedupe-infusion");

module.exports = function (grunt) {
    var shell = require("shelljs"),
        _ = grunt.util._; // for _.merge - we can't load Infusion since we are probably trying to resolve it during the build
 
        
    var default_options = {
        node_modules: "./node_modules",
        universal: "../node_modules/universal",
        universalRepoURL: "git://github.com/GPII/universal.git"
    };
   
    // Subvert the grunt plugin system by creating a single, global, well-known namespace for shared grunt utility functions
    
    var gpiiGrunt = {
        defaults: {
            shell: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                }
            },
            "dedupe-infusion": {
                options: {
                    node_modules: "./node_modules"
                }
            }
        }
    };
        
    grunt.registerTask("dedupe-infusion", "Remove duplicate copies of infusion", function () {
        var options = this.options(gpiiGrunt.defaults["dedupe-infusion"].options);
        dedupeInfusion(options);
    });
    
    gpiiGrunt.shellImmediate = function (options) {
        if (!options.command) {
            grunt.log.error("shellImmediate task must have option \"command\"");
        }
        options = _.merge({ // Oh for a Model Transformations framework
            options: {
                execOptions: {
                    cwd: options.cwd
                }
            }
        }, options);
        if (options.cwd) {
            shell.pushd(options.cwd);
        }
        grunt.log.ok("grunt-gpii executing command " + options.command);
        shell.exec(options.command);
        if (options.cwd) {
            shell.popd();
        }
    };
    
    gpiiGrunt.gitClone = function (options) {
        var gitOptions = options.fastClone ? " --depth=1" : "";
        var gitCommand = "git clone " + gitOptions + " " + options.repoURL + " " + options.localPath;
        gpiiGrunt.shellImmediate({
            command: gitCommand
        });
    };
    
    grunt.registerTask("npm-install", "Reinstall some npm dependencies based on this project's package.json", function () {
        var pkg = gpiiGrunt.packageFile;
        for (var i = 0; i < arguments.length; ++ i) {
            var dep = arguments[i];
            var entry = pkg.dependencies[dep] || pkg.devDependencies[dep];
            if (!entry) {
                grunt.log.error("Package " + dep + " doesn't match any dependency in this project's dependencies or devDependencies (check package.json)");
            }
            var installArg = entry.indexOf("git://") === 0 ? entry : dep + "@\"" + entry + "\"";
            gpiiGrunt.shellImmediate({
                command: "npm install " + installArg
            });
        }
    });
    
    grunt.registerTask("gpii-universal", "Fetch and Install Universal", function () {
        var options = this.options(default_options);

        grunt.file.mkdir(options.node_modules);
        
        gpiiGrunt.gitClone({
            fastClone: grunt.option("fastClone"),
            repoURL: options.universalRepoURL,
            localPath: options.universal
        });

        gpiiGrunt.shellImmediate({
            command: "npm install",
            cwd: options.universal
        });
        
        dedupeInfusion({
            node_modules: "../node_modules/universal/node_modules"
        });
    });

    grunt.registerTask("lint", "Apply jshint and jsonlint", ["jshint", "jsonlint"]);
    
    var packageFile = grunt.file.readJSON("package.json");
    
    gpiiGrunt.packageFile = packageFile;
    
    // Advertise our subversive package in the global configuration
    grunt.config.set("gpiiGruntGlobal", gpiiGrunt);
};
