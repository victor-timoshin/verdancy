'use strict';

import { IPubSubRegistry } from './pubsubregistry.interface';

export class PubSubRegistry implements IPubSubRegistry {
	public events = {};

	constructor() {
		// Empty
	}

	/**
	 * Публикация события с данными
	 * 
	 * @param eventname
	 * @param data 
	 */
	public publish(eventname: string, data: any): void {
		if (this.events[eventname]) {
			this.events[eventname].forEach((fn: (data: any) => void) => {
				fn(data);
			});
		}
	}

	/**
	 * Подписаться на событие
	 * 
	 * @param eventname 
	 * @param fn 
	 */
	public subscribe(eventname: string, fn: (data: any) => void): void {
		this.events[eventname] = this.events[eventname] || [];
		this.events[eventname].push(fn);
	}
};
