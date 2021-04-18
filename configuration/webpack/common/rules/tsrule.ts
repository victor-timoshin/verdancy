'use strict';

import webpack from 'webpack';

export const tsRule = (): webpack.RuleSetRule => ({
	test: /\.ts$/,
	loader: 'ts-loader',
	options: {
		appendTsSuffixTo: [/\.vue$/]
	}
});
