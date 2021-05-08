'use strict';

import { buildConfg } from '../../configuration/buildconfig';
import { WebServer } from './webserver';

export const bootstrap = async (hostname: string = buildConfg.dev.hostname, port: number = buildConfg.realport) => {
	try {
		const server = new WebServer(hostname, port);
		server.on('listening', () => 
			console.log('WebServer started on %s:%d', hostname, port));

		await server.listen();
	} catch (err) {
		console.error(err);
	}
};
