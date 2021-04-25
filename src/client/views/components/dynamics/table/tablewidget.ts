'use strict';

import { defineComponent } from 'vue';
import { Methodology } from '@timcowebapps/common.ooscss';
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
			viewstyle: {
				stylesheet: require('./tablewidget.scss').default,
				bem: Methodology.Bem.Entities
			}
		}
	},
	mounted() {
		//let tableElement = this.$refs['TableWidgetRef'] as Element;
		window.addEventListener('resize', this.resizeEventHandler);
	},
	unmounted() {
		window.removeEventListener('resize', this.resizeEventHandler);
	}
});
