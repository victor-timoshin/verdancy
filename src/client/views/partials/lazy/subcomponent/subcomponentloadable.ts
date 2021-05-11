'use strict';

import * as _ from 'underscore';
import { defineAsyncComponent } from 'vue';
import { SubcomponentNameUtils } from './subcomponentname.enum';
import SpinnerComponent from '../../lazy/spinner.vue';
import ErrorComponent from '../../lazy/error.vue';

export class SubcomponentLoadable {
	public static ImitateWaitTimeout = 2000;
	constructor() {
		// Empty
	}

	public static dynamicImport(): any {
		const subcomponents = {};
		const subcomponentFilenames = (context: __WebpackModuleApi.RequireContext): Array<string> => {
			return context.keys().map((file: string) => file.replace(/(^.\/)|(\.vue$)/g, ''));
		}

		subcomponentFilenames(require.context('@components/dynamics', true, /\.vue$/i, 'sync')).forEach((subcomponent: string) => {
			let subcomponentSegments = subcomponent.split('/');
			let subcomponentName = subcomponentSegments[subcomponentSegments.length - 1];
			_.each(_.invoke(SubcomponentNameUtils.enumToArr(), 'toLowerCase'), (name: string, idx: number) => { 
				console.log(name, subcomponentName);
				if (_.isEqual(name, subcomponentName)) {
					subcomponents[SubcomponentNameUtils.enumToArr()[idx]] =
						defineAsyncComponent({
							loader: () => {
								return new Promise<any>(resolve => {
									setTimeout(() => {
										resolve(
											import(
											/* webpackChunkName: `chunk-${subcomponentName}` */
											/* webpackExports: ["default", "named"] */
											/* webpackMode: "lazy" */
											`@components/dynamics/${subcomponent}.vue`).then(module => {
												return module.default;
											})
										)
									}, SubcomponentLoadable.ImitateWaitTimeout);
								});
							},
							loadingComponent: SpinnerComponent,
							errorComponent: ErrorComponent,
							delay: 200,
							timeout: 3000,
							suspensible: false
						});
					return;
				}
			});
		});

		return subcomponents;
	}
};
