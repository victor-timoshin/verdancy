'use strict';

import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { SERVER_DEBUG, buildConfg, CLIENT_PORT, SERVER_PROTOCOL, CREATOR } from '../buildconfig';
import { ModeEnum } from './foundation/modeenum';
import { webpackContext } from './webpackcontext';
import { getClientBaseConfig } from './clientconfig.base';

const packageJson: any = JSON.parse(fs.readFileSync(path.resolve('./package.json')).toString());

export const clientConfig: webpack.Configuration = webpackMerge(getClientBaseConfig(ModeEnum.Production), {
	name: 'ClientConfig',
	mode: ModeEnum.Production,
	devtool: 'inline-source-map',
	node: {
		//fs: 'empty'
	},
	entry: {
		'client': {
			import: path.resolve(webpackContext, buildConfg.paths.src.base, 'client/entry.ts')
		},
		// 'tablewidget': {
		// 	import: path.resolve(webpackContext, buildConfg.paths.src.base, 'client/views/components/dynamics/table/tablewidget'),
		// 	dependOn: 'client'
		// }
	},
	output: {
		filename: buildConfg.disabledChunkhash
			? '[name].js'
			: '[name].[fullhash:8].js',
		sourceMapFilename: buildConfg.disabledChunkhash
			? '[name].map'
			: '[name].[fullhash:8].map',
		chunkFilename: buildConfg.disabledChunkhash
			? '[name].chunk.js'
			: '[name].[fullhash:8].chunk.js',
		publicPath: buildConfg.urls.publicPath
	},
	optimization: {
		chunkIds: 'named',
		splitChunks: {
			cacheGroups: {
				components: {
					name: 'tablewidget',
					test: /[\\/]src[\\/]client[\\/]views[\\/]components[\\/]dynamics[\\/]/,
					chunks: 'all',
					enforce: true
				},
				node_vendors: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					priority: -10
				}
			}
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true
			})
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: buildConfg.disabledChunkhash
				? '[name].css'
				: '[name].[contenthash:8].css',
			chunkFilename: buildConfg.disabledChunkhash
				? '[name].chunk.css'
				: '[name].[contenthash:8].chunk.css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODEENV: JSON.stringify(ModeEnum.Production),
				BROWSER: JSON.stringify(true),
				VERSION: JSON.stringify(packageJson.version)
			},
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: true
		}),
		new HtmlPlugin({
			title: '',
			template: path.resolve(webpackContext, buildConfg.paths.src.layouts, buildConfg.tmpl.master + buildConfg.tmpl.extname),
			filename: path.resolve(webpackContext, buildConfg.paths.output.base, buildConfg.tmpl.master + buildConfg.tmpl.extname),
			hash: false,
			cache: true,
			showErrors: false,
			inject: false,
			urlContent: (content: string) => SERVER_DEBUG
				? `${SERVER_PROTOCOL}://127.0.0.1:${CLIENT_PORT}/` + content
				: `${SERVER_PROTOCOL}://verdancy.ru/` + content,
			metaTags: {
				// Empty
			},
			minify: false
		}),
		new CompressionPlugin({
			test: /\.js$|\.css$|\.html$/,
			filename: '[path][base].gz',
			algorithm: 'gzip',
			threshold: 10240,
			minRatio: 0.8
		})
	]
});
