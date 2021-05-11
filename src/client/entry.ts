'use strict';

import { createApp } from 'vue';
import { router } from '../router';
import { FakeStorage } from '../core/storage';
import { bus, api } from '../core/_exports';
import SocketPlugin from './plugins/socketplugin';
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
	let state = {} as any;
	const scriptElement = document.getElementById('__INITIAL_STATE__') as HTMLElement;
	if (scriptElement)
		if (typeof scriptElement.textContent === 'string')
			state = JSON.parse(scriptElement.textContent);

	const app = createApp(App);

	app.provide('storage', new FakeStorage());
	app.provide('databusService', new bus.DatabusService());
	app.provide('binanceService', new api.BinanceService());

	app.use(router(state));
	app.use(SocketPlugin, {
		options: {
			useServe: state.ssr
		}
	});

	app.mount('#root');
};
