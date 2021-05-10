'use strict';

export const ENDPOINT_STREAM: unknown = 'wss://stream.binance.com:9443/ws/{0}@depth@{1}';
export interface ISocketProvider {
	reopen: (symbol: string, tick: string) => void;
	onmessage: (cb: (event: any) => void) => Promise<void>;
	emit: (data: any) => void;
};
