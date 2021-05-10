'use strict';

import * as _ from 'underscore';
import { IStorage } from './storage.interface';
import { IStorageOptions } from './storageoptions';

export class FakeStorage implements IStorage {
	private symbolnameMutated_: boolean = false;

	constructor(public opts: IStorageOptions = {}) {
		const scriptElement = document.getElementById('__INITIAL_STATE__') as HTMLElement;
		if (scriptElement)
			if (typeof scriptElement.textContent === 'string')
				opts.state = JSON.parse(scriptElement.textContent);
	}

	public get autoupdate(): boolean {
		if (_.isUndefined(localStorage.autoupdate))
			localStorage.autoupdate = _.isUndefined(this.opts.state)
				? true
				: this.opts.state.autoupdate;

		return localStorage.autoupdate;
	}

	public set autoupdate(value: boolean) {
		localStorage.autoupdate = value;
	}

	public get symbolname(): string {
		if (_.isUndefined(localStorage.symbolname))
			localStorage.symbolname = _.isUndefined(this.opts.state)
				? 'BTCUSDT'
				: this.opts.state.symbolname;

		return localStorage.symbolname;
	}

	public set symbolname(value: string) {
		localStorage.symbolname = value;
	}

	public get symbolnameMutated(): boolean {
		return this.symbolnameMutated_;
	}

	public set symbolnameMutated(value: boolean) {
		this.symbolnameMutated_ = value;
	}
};
