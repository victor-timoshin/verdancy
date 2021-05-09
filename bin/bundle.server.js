'use strict';

const webpack = require('webpack');
const buildConfg = require('../configuration/buildconfig.js');
const webpackConfig = require(`../configuration/webpack/serveconfig${buildConfg.devbuild ? '.development' : ''}.js`);

var compiler = webpack(webpackConfig);
compiler.run(function (err, stats) {
	if (err)
		return console.error(err.message);

	console.log(stats.toString({
		colors: true
	}));
});
