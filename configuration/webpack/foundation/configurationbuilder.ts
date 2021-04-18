'use strict';

import { Configuration as WebpackConfiguration } from 'webpack';
import { IConfigurationBuilder } from './configurationbuilder.interface';
import { Plugin } from './plugin';

export class ConfigurationBuilder implements IConfigurationBuilder {
	constructor(private configuration: WebpackConfiguration = {}) {
		// Empty
	}

	public use<TPlugin extends Plugin>(plug: TPlugin): IConfigurationBuilder {
		this.configuration = plug({})(this.configuration);
		return this;
	}

	public toConfig(): WebpackConfiguration {
		return this.configuration;
	}
};
