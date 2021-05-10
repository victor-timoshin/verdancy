'use strict';

import _ from 'underscore';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { IBinanceService, IOrderBookResponse } from './binanceservice.interface';
import { OrderBookResponse } from './orderbook';

export class BinanceService implements IBinanceService {
	public static endpoint = 'https://api.binance.com/api/v3/depth';

	constructor() {
		// Empty
	}

	public fetchDepth = async (endpointParams: { symbol: string, limit: number }): Promise<IOrderBookResponse> => {
		let response = await axios.get(BinanceService.endpoint, {
			params: endpointParams
		});

		let orderbook = new OrderBookResponse(response.data);
		return orderbook.data();
	}

	public fetchDepthStream = async (socket: Socket<DefaultEventsMap, DefaultEventsMap>): Promise<IOrderBookResponse> => {
		return new Promise((resolve: (value: IOrderBookResponse | PromiseLike<IOrderBookResponse>) => void, reject: (reason?: any) => void) => {
			socket.on('diff_depth_stream', (payload: string) => {
				let orderbook = new OrderBookResponse(JSON.parse(payload));
				resolve(orderbook.data());
			});
		});
	}
};
