'use strict';

import webpack from 'webpack';

export const sassLoader = (): webpack.RuleSetUseItem => ({
	loader: 'sass-loader'
});
