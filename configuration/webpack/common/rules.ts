'use strict';

import webpack from 'webpack';
import { ModeEnum } from '../foundation/modeenum';
import { TargetEnum } from '../foundation/targetenum';
import * as rules from './rules/_exports';

export const getRules = (mode: ModeEnum, target: TargetEnum): Array<webpack.RuleSetRule> => ([
	{
		test: /\.vue$/,
		loader: 'vue-loader'
	},
	rules.tsRule(),
	rules.styleRule({ mode, target }),
	rules.assetRule()
]);
