'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssloader = function (mode, target, importLoaders) {
	var loaders = [];

	if (target === 'web')
		loaders.push((mode === 'development')
			? { loader: 'style-loader' }
			: { loader: MiniCssExtractPlugin.loader }
		);

	loaders.push({
		loader: 'css-loader',
		options: {
			importLoaders,
			sourceMap: true,
			modules: {
				localIdentName: (mode === 'production')
					? '[hash:base64:5]'
					: '[local]_[hash:base64:5]'
			}
		}
	});

	return loaders;
};

module.exports = function (mode, target) {
	return [
		// VUE
		{
			test: /\.vue$/,
			loader: 'vue-loader'
		},
		// TS
		{
			test: /\.ts$/,
			loader: 'ts-loader',
			options: { appendTsSuffixTo: [/\.vue$/] }
		},
		// SCSS|CSS
		{
			test: /\.(scss|css)$/,
			resolve: { extensions: ['.scss', '.css'] },
			use: [
				...cssloader(mode, target, 2),
				{
					loader: 'postcss-loader',
					options: { sourceMap: true }
				},
				{
					loader: 'sass-loader',
					options: { sourceMap: true }
				}
			]
		},
		// ASSETS
		{
			test: '/.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/',
			loader: 'file-loader'
		}
	]
};
