'use strict';

import { WebServer } from './webserver';

const buildConfg = require('../../configuration/buildconfig.js');

export const bootstrap = async (port: number) => {
	try {
		console.log('buildConfg.dev.hostname', port);
		const server = new WebServer(port);
		server.on('listening', () => 
			console.log('WebServer started on %s:%d', buildConfg.dev.hostname, port));

		await server.listen();
	} catch (err) {
		console.error(err);
	}
};
