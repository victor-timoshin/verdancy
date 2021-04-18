'use strict';

import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { IOrderBook } from './orderbook';

export interface IBinanceService {
	fetchDepthSnapshot: (endpointParams: { symbol: string, limit: number }) => Promise<IOrderBook>;
	fetchDepthStream: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => Promise<IOrderBook>;
};
