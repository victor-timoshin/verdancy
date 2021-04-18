'use strict';

import { Configuration as WebpackConfiguration } from 'webpack';
import { Plugin } from './plugin';

export interface IConfigurationBuilder {
	use<TPlugin extends Plugin>(plug: TPlugin): IConfigurationBuilder;

	toConfig(): WebpackConfiguration;
};
