'use strict';

import { defineComponent } from 'vue';
import { subcomp } from '../../../partials/lazy/_exports';

interface ITableColumn {
	field: string;
	label: string;
};

export default defineComponent({
	name: subcomp.SubcomponentNameUtils.enumToStr(subcomp.SubcomponentNameEnum.TableWidget),
	props: {
		columns: {
			type: Array,
			default: () => []
		},
		data: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		resizeEventHandler(event: UIEvent) {
			// TODO
		}
	},
	data(): any {
		return {
			viewStyle: {
				stylesheet: require('./tablewidget.scss').default
			}
		}
	},
	mounted() {
		//let tableElement = this.$refs['TableWidgetRef'] as Element;
	},

	created() {
		window.addEventListener('resize', this.resizeEventHandler);
	},

	destroyed() {
		window.removeEventListener('resize', this.resizeEventHandler);
	}
});
