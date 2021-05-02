'use strict';

import { Dynamic, Runtime } from '@timcowebapps/common.system';
import { IDatabusService } from './databusservice.interface';
import { IEventHandler } from './eventhandler';
import { IEventMetadata } from './eventmetadata';
import { IEventSubscription } from './eventsubscription';

export class DatabusService implements IDatabusService {
	public subscriptions_ = {};

	constructor() {
		// Empty
	}

	/**
	 * Публикация события с данными
	 * 
	 * @param eventname
	 * @param data 
	 */
	 public publish(eventname: string, data: Dynamic.IAnyObject): void {
		if (this.subscriptions_[eventname]) {
			this.subscriptions_[eventname].forEach((event: IEventSubscription) => {
				event.handler(data);
			});
		}
	}

	/**
	 * Подписаться на событие
	 * 
	 * @param eventname 
	 * @param fn 
	 */
	public subscribe<T extends Dynamic.IAnyObject>(eventname: string, metadata: IEventMetadata, handler: IEventHandler<T>): void {
		this.subscriptions_[eventname] = this.subscriptions_[eventname] || [];
		if (this.subscriptions_[eventname].findIndex((event: IEventSubscription) => event.metadata && event.metadata.compid !== metadata.compid))
			this.subscriptions_[eventname].push({ metadata, handler });
	}

	public unsubscribe(eventname: string, metadata: IEventMetadata): void {
		if (this.subscriptions_[eventname]) {
			for (var i = 0; i < this.subscriptions_[eventname].length; i++) {
				if (this.subscriptions_[eventname][i].metadata.compid === metadata.compid)
					this.subscriptions_[eventname].splice(i, 1);
			}
		}
	}
};
