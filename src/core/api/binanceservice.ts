'use strict';

import _ from 'underscore';
import axios from 'axios';
import { ISocketProvider } from '../../client/plugins/socketprovider.interface';
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

	public fetchDepthStream = async (socket: ISocketProvider): Promise<IOrderBookResponse> => {
		return await new Promise((resolve: (value: IOrderBookResponse | PromiseLike<IOrderBookResponse>) => void, reject: (reason?: any) => void) => {
			return socket.onmessage((payload: string) => {
				let orderbook = new OrderBookResponse(JSON.parse(payload));
				resolve(orderbook.data());
			});
		});
	}
};
