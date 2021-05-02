'use strict';

import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

export interface IOrderBookResponse {
	bids: Array<any>;
	asks: Array<any>;
	lastUpdateId?: number;
};

export interface IBinanceService {
	fetchDepth: (endpointParams: { symbol: string, limit: number }) => Promise<IOrderBookResponse>;
	fetchDepthStream: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => Promise<IOrderBookResponse>;
};
