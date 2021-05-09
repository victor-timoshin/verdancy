'use strict';

const buildconfg = require('../../configuration/buildconfig.js');
const bundle = require('../../wwwroot/dist/server-bundle.js');

bundle.bootstrap(buildconfg.realport).then(() => {
	// Empty
}).catch(error => console.error(error));
