'use strict';

const bundle = require('../../wwwroot/dist/server-bundle.js');
console.log(process.env.HOSTNAME);
console.log(process.env.IP);
bundle.bootstrap(process.env.HOSTNAME, parseInt(process.env.PORT)).then(() => {
	// Empty
}).catch(error => console.error(error));
