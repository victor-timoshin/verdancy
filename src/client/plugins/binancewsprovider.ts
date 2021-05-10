'use strict';

import { ENDPOINT_STREAM, ISocketProvider } from './socketprovider.interface';
import './string.format';

export class BinanceWSProvider implements ISocketProvider {
	private websocket_: any = undefined;

	constructor() {
		this.reopen('BTCUSDT', '1000ms');
	}

	public reopen(symbol: string, tick: string): void {
		if (this.websocket_ && this.websocket_.readyState === WebSocket.OPEN) {
			this.websocket_.close();
			this.websocket_ = undefined;
		}

		this.websocket_ = new WebSocket((ENDPOINT_STREAM as String).format(symbol.toLowerCase(), tick));
		this.websocket_.addEventListener('open', function (event: any) {
			console.log('WebSocket connected to Binance');
		});
	}

	private async waitForSocketConnection(callback: () => void): Promise<void> {
		return await new Promise(resolve => {
			let timeoutId = setTimeout(() => {
				if (this.websocket_.readyState === WebSocket.OPEN) {
					if (callback != null) {
						clearTimeout(timeoutId);
						resolve(callback());
					}
				} else {
					console.info('wait for connection...');
					this.waitForSocketConnection(callback);
				}
			}, 5);
		});
	}

	public async onmessage(cb: (payload: any) => void): Promise<void> {
		await this.waitForSocketConnection(() => {
			this.websocket_.addEventListener('message', (event: any) => cb(event.data));
		});
	}

	public emit(data: any): void {
		// Empty
	}
};
