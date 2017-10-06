/*
 * (C) Copyright IBM Corp. 2012, 2016 All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getConfig(dojoRoot) {
	// dojoRoot is defined if we're running in node (i.e. building)
	if (dojoRoot) {
		var path = require('path');
	}
	dojoConfig = {
		baseUrl: ".",
		packages: [
			{
				name: 'dojo',
				location: dojoRoot ? path.join(dojoRoot, "./dojo").replace("\\", "/") : './node_modules/dojo',
				lib: '.'
			},
			{
				name: 'dijit',
				location: dojoRoot ? path.join(dojoRoot, "./dijit").replace("\\", "/") : './node_modules/dijit',
				lib: '.'
			},
			{
				name: 'dojox',
				location: dojoRoot ? path.join(dojoRoot, "./dojox").replace("\\", "/") : './node_modules/dojox',
				lib: '.'
			}
		],

		paths: {
			js: "js",
			lib: "lib",
			"@hpcc-js/chart": "node_modules/@hpcc-js/chart/dist/chart",
			"@hpcc-js/common": "node_modules/@hpcc-js/common/dist/common",
			"@hpcc-js/api": "node_modules/@hpcc-js/api/dist/api",
			"tslib": "node_modules/tslib/tslib",
			theme: "theme",
			// With the webpack build, the css loader plugin is replaced by a webpack loader
			// via webpack.config.js, so the following are used only by the unpacked app.
			css: "loader/css",
			// lesspp is used by the css loader plugin when loading LESS modules
			lesspp: "loader/less.min"
		},

		blankGif: "./blank.gif",

		deps: ["lib/bootstrap"],

		async: true
	};
	return dojoConfig;
}
// For Webpack, export the config.  This is needed both at build time and on the client at runtime
// for the packed application.
if (typeof module !== 'undefined' && module) {
	module.exports = getConfig;
} else {
	getConfig();
}
