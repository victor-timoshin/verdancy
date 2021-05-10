'use strict';

import { App } from 'vue';
import SocketIO, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export default {
	install: (app: App<Element>, { connection, options }) => {
		const binanceSocketIO: Socket<DefaultEventsMap, DefaultEventsMap> = SocketIO(connection, options);
		//app.config.globalProperties.$socket = binanceSocketIO;
		app.provide('binanceSocketIOProvider', binanceSocketIO);
	}
}
