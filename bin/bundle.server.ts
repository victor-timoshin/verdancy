'use strict';

import webpack from 'webpack';
import { buildConfg } from '../configuration/buildconfig';
import { serverDevConfig } from '../configuration/webpack/serveconfig.development';
import { serverConfig } from '../configuration/webpack/serveconfig';

var compiler = webpack(buildConfg.isDevelopmentMode ? serverDevConfig : serverConfig);
compiler.run((err: any, stats: any): void => {
	if (err)
		return console.error(err.message);

	console.log(stats.toString({
		colors: true
	}));
});
