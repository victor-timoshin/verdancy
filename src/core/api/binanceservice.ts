'use strict';

import axios from 'axios';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { IBinanceService } from './binanceservice.interface';
import { getDepthData, IOrderBook } from './orderbook';

export class BinanceService implements IBinanceService {
	public static endpoint = 'https://api.binance.com/api/v3/depth';

	constructor() {
		// Empty
	}

	public fetchDepthSnapshot = async (endpointParams: { symbol: string, limit: number }): Promise<IOrderBook> => {
		let response = await axios.get(BinanceService.endpoint, {
			params: endpointParams
		});

		let orderBook: IOrderBook = {
			bids: [],
			asks: []
		};

		if (typeof response.data.bids !== 'undefined') {
			for (let obj of response.data.bids) {
				orderBook.bids.push({
					quantity: parseFloat(obj[1]),
					price: parseFloat(obj[0])
				});
			}
		}

		if (typeof response.data.asks !== 'undefined') {
			for (let obj of response.data.asks) {
				orderBook.asks.push({
					quantity: parseFloat(obj[1]),
					price: parseFloat(obj[0])
				});
			}
		}

		return orderBook;
	}

	public fetchDepthStream = async (socket: Socket<DefaultEventsMap, DefaultEventsMap>): Promise<IOrderBook> => {
		return new Promise((resolve: (value: IOrderBook | PromiseLike<IOrderBook>) => void, reject: (reason?: any) => void) => {
			socket.on('diff_depth_stream', (payload: string) => {
				resolve(getDepthData(JSON.parse(payload)));
			});
		});
	}
};
