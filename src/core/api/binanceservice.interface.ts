'use strict';

import { ISocketProvider } from '../../client/plugins/socketprovider.interface';

export interface IOrderBookResponse {
	bids: Array<any>;
	asks: Array<any>;
	lastUpdateId?: number;
};

export interface IBinanceService {
	fetchDepth: (endpointParams: { symbol: string, limit: number }) => Promise<IOrderBookResponse>;
	fetchDepthStream: (socket: ISocketProvider) => Promise<IOrderBookResponse>;
};
