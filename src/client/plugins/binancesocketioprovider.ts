'use strict';

import SocketIO, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ISocketProvider } from './socketprovider.interface';
import './string.format';

const buildConfg = require('../../../configuration/buildconfig.js');

export class BinanceSocketIOProvider implements ISocketProvider {
	private websocket_: Socket<DefaultEventsMap, DefaultEventsMap> | undefined = undefined;

	constructor() {
		this.websocket_ = SocketIO(buildConfg.isDebugMode
			? `ws://127.0.0.1:${process.env.PORT}`
			: 'ws://verdancy.herokuapp.com', {
			// Empty
		});
	}

	public reopen(symbol: string, tick: string): void {
		if (this.websocket_ && this.websocket_.connected) {
			this.websocket_.disconnect();
			this.websocket_.connect();
		}
	}

	public async onmessage(cb: (event: any) => void): Promise<void> {
		if (this.websocket_)
			this.websocket_.on('diff_depth_stream', cb);
	}

	public emit(data: any): void {
		if (this.websocket_)
			this.websocket_.emit('diff_depth_stream__update_symbol', data);
	}
};
