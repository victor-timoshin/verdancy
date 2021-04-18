'use strict';

import webpack from 'webpack';
import { IStyleRuleOptions } from './styleruleoptions';
import * as loaders from './loaders/_exports';

export const styleRule = (options: IStyleRuleOptions): webpack.RuleSetRule => ({
	test: /\.(scss|css)$/,
	resolve: { extensions: ['.scss', '.css'] },
	use: [
		...loaders.cssLoader(options.mode, options.target, 2),
		loaders.postcssLoader(),
		loaders.sassLoader()
	]
});
