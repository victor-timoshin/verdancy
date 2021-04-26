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
			this.setTableWidth();
		},
		setTableWidth() {
			let tablewidgetElement = this.$refs['tablewidgetRef'] as Element;
			let tableElement = this.$refs['tablewidgetBodyRef'] as Element;
			let groupElement = tableElement.getElementsByTagName('colgroup')[0];
			let groupElementCollection = groupElement.getElementsByTagName('col');
			for (let i = 0; i < groupElementCollection.length; i++) {
				groupElementCollection[i].style.width = tablewidgetElement.clientWidth / 2 + 'px';
			}
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
		this.setTableWidth();
		window.addEventListener('resize', this.resizeEventHandler);
	},
	unmounted() {
		window.removeEventListener('resize', this.resizeEventHandler);
	}
});
