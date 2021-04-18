'use strict';

import webpack from 'webpack';

export const assetRule = (): webpack.RuleSetRule => ({
	test: '/.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/',
	loader: 'file-loader'
});
