'use strict';

import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { buildConfg, CREATOR, SERVER_PROTOCOL } from '../buildconfig';
import { ModeEnum } from './foundation/modeenum';
import { webpackContext } from './webpackcontext';
import { getClientBaseConfig } from './clientconfig.base';

const packageJson: any = JSON.parse(fs.readFileSync(path.resolve('./package.json')).toString());

export const clientDevConfig: webpack.Configuration = webpackMerge(getClientBaseConfig(ModeEnum.Development), {
	name: 'ClientDevConfg',
	mode: ModeEnum.Development,
	devtool: 'cheap-module-source-map',
	entry: {
		'client': [
			`webpack-dev-server/client?${SERVER_PROTOCOL}://${buildConfg.dev.ipaddress}:${buildConfg.dev.port}`,
			'webpack/hot/only-dev-server',
			path.resolve(webpackContext, buildConfg.paths.src.base, 'client/entry')
		],
		// 'tablewidget': {
		// 	import: path.resolve(webpackContext, buildConfg.paths.src.base, 'client/views/components/dynamics/table/tablewidget')
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
		hotUpdateChunkFilename: 'hot/hot-update.js',
		hotUpdateMainFilename: 'hot/hot-update.json',
		publicPath: buildConfg.dev.publicPath
	},
	optimization: {
		//runtimeChunk: 'single'
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
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODEENV: JSON.stringify(ModeEnum.Development),
				BROWSER: JSON.stringify(true),
				VERSION: JSON.stringify(packageJson.version)
			},
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		}),
		new HtmlPlugin({
			title: '',
			template: path.resolve(webpackContext, buildConfg.paths.src.layouts, buildConfg.tmpl.master + buildConfg.tmpl.extname),
			filename: path.resolve(webpackContext, buildConfg.paths.output.base, buildConfg.tmpl.master + buildConfg.tmpl.extname),
			// chunks: [
			// 	'tablewidget'
			// ],
			minify: false,
			hash: true,
			inject: false,
			urlContent: (content: string) => content,
			metaTags: {
				// Empty
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	]
});
