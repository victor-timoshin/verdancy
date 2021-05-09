'use strict';

import { createApp } from 'vue';
import { router } from '../router';
import { FakeStorage } from '../core/storage';
import { bus, api } from '../core/_exports';
import SocketIOPlugin from './plugins/socket';
import App from './views/app.vue';

const buildConfg = require('../../configuration/buildconfig.js');

import './entry.scss';

if ((module as any).hot) {
	(module as any).hot.accept((err: any) => {
		if (err)
			console.error('Cannot apply HMR update.', err);
	});
}

window.onload = () => {
	const app = createApp(App);

	app.provide('storage', new FakeStorage());
	app.provide('databusService', new bus.DatabusService());
	app.provide('binanceService', new api.BinanceService());

	app.use(router);
	app.use(SocketIOPlugin, {
		connection: buildConfg.isDebugMode
				? `ws://127.0.0.1:${process.env.PORT}`
				: 'ws://verdancy.herokuapp.com',
		options: {
			// Empty
		}
	});
	app.mount('#root');
};
