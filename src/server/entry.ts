'use strict';

import { buildConfg } from '../../configuration/buildconfig';
import { WebServer } from './webserver';

export const bootstrap = async (ip: string = buildConfg.dev.ipaddress, port: number = buildConfg.realport) => {
	try {
		const server = new WebServer(ip, port);
		server.on('listening', () => 
			console.log('WebServer started on %s:%d', ip, port));

		await server.listen();
	} catch (err) {
		console.error(err);
	}
};
