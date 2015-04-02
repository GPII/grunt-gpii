# Grunt GPII

This module defines a grunt plugin for use with the GPII's projects. In particular it defines the following grunt
tasks:

* dedupe-infusion - This task meets the requirements of [http://issues.gpii.net/browse/GPII-492](http://issues.gpii.net/browse/GPII-492) . Due to changes in npm's semantic introduced in its
versions 1.3.x, it is now no longer possible to ensure that duplicate instances of the fluid-infusion node module are installed throughout the tree
as a result of the npm install process. This grunt tasks manually searches for and deletes all instances except for the least nested one.

* gpii-universal - This task fetches GPII's `universal` project by either a shallow or deep git clone (control this by using the `fastClone` option
to the grunt task), runs `npm install` and then the `dedupe-infusion` task.

* npm-install - This task installs or reinstalls a selection of dependencies from this project's package.json file. This is useful during development where perhaps only one dependency has been
updated and a quick update is required. For example, the command `grunt npm-install:infusion` will just reinstall this project's `infusion` module.

* lint - This task is an alias for the tasks `jshint` followed by `jsonlint`. This should be run in each GPII core project before each pull request, to ensure that all .js and .json files pass linting.

The `gpii-universal` task is suitable for running from the top level of our architecture-specific repositories, e.g. linux and windows.

Please consult the page [http://wiki.gpii.net/w/Setting_Up_Your_Development_Environment](http://wiki.gpii.net/w/Setting_Up_Your_Development_Environment) for more details.   
