'use strict';

import * as _ from 'underscore';
import { defineComponent, inject } from 'vue';
import MastheadComponent from './components/header/masthead.vue';

export default defineComponent({
	name: 'Root',
	components: {
		MastheadComponent
	},
	data(): any {
		return {
			// Empty
		}
	},
	setup() {
		let PubSubRegistry: any = inject('PubSubRegistry');
	// 	PubSubRegistry.publish('DataTablePayload', {
	// 		columns: [{
	// 			field: 'quantity',
	// 			label: 'Кол-во'
	// 		}, {
	// 			field: 'price',
	// 			label: 'Цена'
	// 		}],
	// 		data: []
	// 	});

		return {
		}
	}
});
