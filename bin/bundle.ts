'use strict';

import webpack from 'webpack';
import { buildConfg } from '../configuration/buildconfig';
import { clientDevConfig } from '../configuration/webpack/clientconfig.development';
import { clientConfig } from '../configuration/webpack/clientconfig';

var compiler = webpack(buildConfg.isDevelopmentMode ? clientDevConfig : clientConfig);
compiler.run((err: any, stats: any): void => {
	if (err)
		return console.error(err.message);

	console.log(stats.toString({
		colors: true
	}));
});
