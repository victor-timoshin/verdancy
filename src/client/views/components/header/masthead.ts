'use strict';

import { defineComponent } from 'vue';
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
			viewStyle: {
				stylesheet: require('./masthead.scss').default
			}
		}
	}
});
