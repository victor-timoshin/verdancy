'use strict';

interface String {
	format(...replacements: string[]): string;
}

(String.prototype as any).format = function() {
	var args: IArguments = arguments;
	return this.replace(/{(\d+)}/g, (match: string, number: number) => {
		return typeof args[number] != 'undefined'
			? args[number]
			: match;
	});
};

export class BinanceWSProvider {
	private readonly endpoint_: unknown = 'wss://stream.binance.com:9443/ws/{0}@depth@{1}';
	private websocket_: any = undefined;

	constructor() {
		// Empty
	}

	public reopen(symbol: string, tick: string) {
		if (this.websocket_ && this.websocket_!.readyState === WebSocket.OPEN) {
			this.websocket_!.close();
			this.websocket_ = undefined;
		}

		this.websocket_! = new WebSocket((this.endpoint_ as String).format(symbol, tick));
		this.websocket_!.addEventListener('open', (event: any) => console.log('connected to Binance WebSocket'));
		this.websocket_!.addEventListener('message', (event: any) => {
			console.log('diff_depth_stream', event.data);
		});
	}
};
