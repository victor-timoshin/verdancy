'use strict';

import * as _ from 'underscore';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { buildConfg, SERVER_PROTOCOL } from '../../configuration/buildconfig';
import { clientDevConfig } from '../../configuration/webpack/clientconfig.development';
import { serverDevConfig } from '../../configuration/webpack/serveconfig.development';

new WebpackDevServer(webpack(clientDevConfig), {
	https: _.isEqual(SERVER_PROTOCOL, 'https'),
	contentBase: buildConfg.paths.output.base,
	publicPath: buildConfg.dev.publicPath,
	hot: true,
	inline: true,
	host: buildConfg.dev.ipaddress,
	port: buildConfg.dev.port,
	overlay: true,
	compress: true,
	stats: {
		chunk: false,
		chunkModules: false,
		modules: false,
		source: false,
		chunkOrigins: false
	},
	open: false,
	historyApiFallback: true,
	disableHostCheck: true,
	watchContentBase: true,
	watchOptions: { ignored: /node_modules/ },
	headers: { 'Access-Control-Allow-Origin': '*' }
}).listen(buildConfg.dev.port, buildConfg.dev.ipaddress, (err: any) => {
	if (err)
		console.error(err);

	console.log('Webpack server launched with at localhost:%d (Hot Module Replacement [HMR] enabled)', buildConfg.dev.port);
});

webpack(serverDevConfig).watch({}, (err: any, stats: any) => {
	if (err)
		return console.error(err.message);
});
