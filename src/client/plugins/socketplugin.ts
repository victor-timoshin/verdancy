'use strict';

import { App } from 'vue';
import { ISocketProvider } from './socketprovider.interface';
import { BinanceSocketIOProvider } from './binancesocketioprovider';
import { BinanceWSProvider } from './binancewsprovider';

export default {
	install: (app: App<Element>, { options }) => {
		console.log(Boolean(options.useServe).valueOf());
		const socket: ISocketProvider = Boolean(options.useServe).valueOf()
			? new BinanceSocketIOProvider()
			: new BinanceWSProvider();
		//app.config.globalProperties.$socket = socket;
		app.provide('binanceSocketProvider', socket);
	}
}
