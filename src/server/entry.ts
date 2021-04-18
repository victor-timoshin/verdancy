'use strict';

import { buildConfg } from '../../configuration/buildconfig';
import { WebServer } from './webserver';

export const bootstrap = async () => {
	try {
		const server = new WebServer(buildConfg.dev.ipaddress, buildConfg.realport);
		server.on('listening', () => 
			console.log('WebServer started on %s:%d', buildConfg.dev.ipaddress, buildConfg.realport));

		await server.listen();
	} catch (err) {
		console.error(err);
	}
};
