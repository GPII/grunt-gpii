/*
 * grunt-gpii
 * https://github.com/sgithens/grunt-gpii
 *
 * Copyright (c) 2014 Steven Githens
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var path = require("path");
    
    grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask("gpiiUniversal", "Fetch and Install Universal", function() {
    var options = this.options({
        node_modules: ".."+path.sep+"node_modules",
        universal: ".."+path.sep+"node_modules"+path.sep+"universal",
        repoURL: "git://github.com/GPII/universal.git"
    });
    var shell = grunt.config.get("shell") || {};
    var shellOptions = {
        stdout: true,
        stderr: true
    };
    shell.gitClone = { 
        options: shellOptions,
        command: function() {
            return 'git clone --depth=1 ' + options.repoURL + " " + options.universal;
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
                    return 'npm install';
                }
    };
    grunt.config.set("shell", shell);
    grunt.file.mkdir(options.node_modules);
    grunt.task.run("shell:gitClone");
    grunt.task.run("shell:npmInstall");
  });

};