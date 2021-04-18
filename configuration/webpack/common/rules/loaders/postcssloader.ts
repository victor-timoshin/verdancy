'use strict';

import webpack from 'webpack';

export const postcssLoader = (): webpack.RuleSetUseItem => ({
	loader: 'postcss-loader',
	options: {
		sourceMap: true
	}
});
