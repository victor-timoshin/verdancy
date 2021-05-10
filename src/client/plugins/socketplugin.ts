'use strict';

import { App } from 'vue';
import { ISocketProvider } from './socketprovider.interface';
import { BinanceSocketIOProvider } from './binancesocketioprovider';
import { BinanceWSProvider } from './binancewsprovider';

export default {
	install: (app: App<Element>, { options }) => {
		const socket: ISocketProvider = options.useServe
			? new BinanceWSProvider()
			: new BinanceSocketIOProvider();
		//app.config.globalProperties.$socket = socket;
		app.provide('binanceSocketProvider', socket);
	}
}
