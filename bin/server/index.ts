'use strict';

const bundle = require('../../wwwroot/dist/server-bundle.js');
bundle.bootstrap().then(() => {
	// Empty
}).catch(error => console.error(error));
