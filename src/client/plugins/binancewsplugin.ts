'use strict';

import { App } from 'vue';
import { BinanceWSProvider } from './binancewsprovider';

export default {
	install: (app: App<Element>, { options }) => {
		const binanceWS = new BinanceWSProvider();
		//app.config.globalProperties.$socket = binanceWS;
		app.provide('binanceWSProvider', binanceWS);
	}
}
