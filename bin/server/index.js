'use strict';

const bundle = require('../../wwwroot/dist/server-bundle.js');
bundle.bootstrap(process.env.IP, parseInt(process.env.PORT)).then(() => {
	// Empty
}).catch(error => console.error(error));
