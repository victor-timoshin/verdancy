'use strict';

import { Configuration as WebpackConfiguration } from 'webpack';

export type Plugin<TConfiguration = any>
	= (config: TConfiguration) => (webpack: WebpackConfiguration) => WebpackConfiguration;
