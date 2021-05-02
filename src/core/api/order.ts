'use strict';

export interface IOrder {
	price: number;
	quantity: number;
	total?: number;
};

export class OrderResponse implements IOrder {
	private price_: number = 0;
	private quantity_: number = 0;

	constructor(objectData: any) {
		this.price_ = parseFloat(objectData[0]);
		this.quantity_ = parseFloat(objectData[1]);
	}

	public get price(): number {
		return this.price_;
	}

	public get quantity(): number {
		return this.quantity_;
	}

	public get total(): number {
		return Number((this.price_ * this.quantity_).toFixed(8));
	}
};
