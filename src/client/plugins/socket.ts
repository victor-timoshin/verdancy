'use strict';

import { App } from 'vue';
import SocketIO from 'socket.io-client';

export default {
	install: (app: App<Element>, { connection, options }) => {
		const socket = SocketIO(connection, options);
		app.config.globalProperties.$socketProvider = socket;
		app.provide('socketProvider', socket);
	}
}
