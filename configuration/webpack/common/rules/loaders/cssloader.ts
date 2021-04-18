'use strict';

import * as _ from 'underscore';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModeEnum } from '../../../foundation/modeenum';
import { TargetEnum } from '../../../foundation/targetenum';

export const cssLoader = (mode: ModeEnum, target: TargetEnum, importLoaders: number): Array<webpack.RuleSetUseItem> => {
	var loaders: Array<webpack.RuleSetUseItem> = [];

	if (_.isEqual(target, TargetEnum.Web))
		loaders.push(_.isEqual(mode, ModeEnum.Development)
			? {
				loader: 'style-loader',
				options: {
					modules: {
						// Empty
					}
				}
			} : {
				loader: MiniCssExtractPlugin.loader,
				options: {
					modules: {
						// Empty
					}
				}
			});

	loaders.push({
		loader: 'css-loader',
		options: {
			importLoaders,
			sourceMap: true,
			modules: {
				localIdentName: _.isEqual(mode, ModeEnum.Production)
					? '[hash:base64:5]' : '[local]_[hash:base64:5]'
			}
		}
	});

	return loaders;
};
