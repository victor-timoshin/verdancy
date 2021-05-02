'use strict';

import _ from 'underscore';
import { IOrderBookResponse } from './binanceservice.interface';
import { IOrder, OrderResponse } from './order';

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

export class OrderBookResponse {
	private orderbookResponse_: IOrderBookResponse = {
		bids: [],
		asks: []
	};

	constructor(data: any) {
		this.parseOrder_(data, ['bids', 'b']);
		this.parseOrder_(data, ['asks', 'a']);

		this.orderbookResponse_.lastUpdateId = data.lastUpdateId;
	}

	private parseOrder_ = (data: any, propnames: Array<string>) => {
		const objectKeys = Object.keys(data) as Array<string>;
		for (let key of objectKeys) {
			const propname = _.find(propnames, (item: string) => item === key);
			if (typeof propname !== 'undefined') {
				for (let obj of data[propname])
					this.orderbookResponse_[propnames[0]].push(new OrderResponse(obj));
			}
		}
	}

	public data(): IOrderBookResponse {
		return this.orderbookResponse_;
	}
};
