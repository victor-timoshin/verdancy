'use strict';

import * as _ from 'underscore';
import { Dynamic } from '@timcowebapps/common.system';

export interface IFakeStorageOptions extends Dynamic.IAnyObject {
	state?: any;
};

export class FakeStorage {
	constructor(public opts: IFakeStorageOptions = {}) {
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
};
