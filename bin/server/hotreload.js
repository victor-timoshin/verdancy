'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const buildConfg = require('../../configuration/buildconfig.js');
const configClient = require('../../configuration/webpack/clientconfig.development.js');
const configServer = require('../../configuration/webpack/serveconfig.development.js');

let devServer = new WebpackDevServer(webpack(configClient), {
	https: false,
	contentBase: buildConfg.paths.output.base,
	publicPath: buildConfg.dev.publicPath,
	hot: true,
	inline: true,
	host: buildConfg.dev.hostname,
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
}).listen(buildConfg.dev.port, buildConfg.dev.hostname, (err) => {
	if (err)
		console.error(err);

	console.log('Webpack server launched with at localhost:%d (Hot Module Replacement [HMR] enabled)', buildConfg.dev.port);
});

webpack(configServer).watch({}, (err, stats) => {
	if (err)
		return console.error(err.message);
});
