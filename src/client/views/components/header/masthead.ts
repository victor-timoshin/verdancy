'use strict';

import { defineComponent } from 'vue';
import { Methodology } from '@timcowebapps/common.ooscss';
import { RouteDataset } from '../../../../common/routedataset';

export default defineComponent({
	name: 'Masthead',
	data(): any {
		return {
			routes: {
				items: [
					{ path: RouteDataset.home.path, title: RouteDataset.home.meta.title },
					{ path: RouteDataset.about.path, title: RouteDataset.about.meta.title }
				]
			},
			viewstyle: {
				stylesheet: require('./masthead.scss').default,
				bem: Methodology.Bem.Entities
			}
		}
	}
});
