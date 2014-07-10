# Grunt GPII

This module defines a grunt plugin for use with the GPII's projects. In particular it defines the following grunt
tasks:

* dedupeInfusion - This task meets the requirements of [http://issues.gpii.net/browse/GPII-492](http://issues.gpii.net/browse/GPII-492) . Due to changes in npm's semantic introduced in its
versions 1.3.x, it is now no longer possible to ensure that duplicate instances of the fluid-infusion node module are installed throughout the tree
as a result of the npm install process. This grunt tasks manually searches for and deletes all instances except for the least nested one.

* gpiiUniversal - This task fetches GPII's `universal` project by either a shallow or deep git clone (control this by using the `fastClone` option
to the grunt task), runs `npm install` and then the `dedupeInfusion` task.

The `gpiiUniversal` project is suitable for running from the top level of our architecture-specific repositories, e.g. linux and windows.

Please consult the page [http://wiki.gpii.net/w/Setting_Up_Your_Development_Environment](http://wiki.gpii.net/w/Setting_Up_Your_Development_Environment) for more details.   
