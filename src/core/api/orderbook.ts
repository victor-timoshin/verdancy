'use strict';

import { IOrder } from './order';

export interface IOrderBook {
	bids: Array<IOrder>;
	asks: Array<IOrder>;
};

export const initialOrderBook = {
	bids: [{
		quantity: 0,
		price: 0
	}],
	asks: [{
		quantity: 0,
		price: 0
	}]
};

export const getDepthData = (data: any) => {
	let orderBook: IOrderBook = {
		bids: [],
		asks: []
	};

	if (typeof data.b !== 'undefined') {
		for (let obj of data.b) {
			orderBook.bids.push({
				quantity: parseFloat(obj[1]),
				price: parseFloat(obj[0])
			});
		}
	}

	if (typeof data.a !== 'undefined') {
		for (let obj of data.a) {
			orderBook.asks.push({
				quantity: parseFloat(obj[1]),
				price: parseFloat(obj[0])
			});
		}
	}

	return orderBook;
}
