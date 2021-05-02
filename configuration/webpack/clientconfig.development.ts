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
		]
	},
	output: {
		filename: buildConfg.disabledChunkhash
			? '[name].js'
			: '[name].[fullhash:8].js',
		sourceMapFilename: buildConfg.disabledChunkhash
			? '[file].js.map'
			: '[file].[fullhash:8].js.map',
		chunkFilename: buildConfg.disabledChunkhash
			? '[name].chunk.js'
			: '[name].[fullhash:8].chunk.js',
		hotUpdateChunkFilename: 'hot/[id].hot-update.js',
		hotUpdateMainFilename: 'hot/hot-update.json',
		publicPath: buildConfg.dev.publicPath
	},
	optimization: {
		chunkIds: 'named',
		splitChunks: {
			minChunks: 1,
			cacheGroups: {
				vendors: {
					name: 'chunk-vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial'
				},
				common: {
					name: 'chunk-common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				},
				components: {
					name: 'chunk-tablewidget',
					test: /[\\/]src[\\/]client[\\/]views[\\/]components[\\/]dynamics[\\/]/,
					chunks: 'all',
					enforce: true
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
			minify: false,
			hash: true,
			inject: false,
			injectState: {
				INITIAL_STATE: `<script id='__INITIAL_STATE__' type='application/json'>
					${JSON.stringify({
						autoupdate: false,
						symbolname: 'BTCUSDT'
					}).replace(/</g,'\\u003c')}
				</script>`
			},
			urlContent: (content: string) => content,
			metaTags: {
				// Empty
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	]
});
