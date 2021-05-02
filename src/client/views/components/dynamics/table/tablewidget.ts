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
			this.recalculateTableWidth();
		},
		recalculateTableWidth() {
			let tablewidgetHeadElement = this.$refs['tablewidgetHeadRef'] as Element;
			let theadCellElements = tablewidgetHeadElement.getElementsByTagName('th');

			let tablewidgetBodyElement = this.$refs['tablewidgetBodyRef'] as Element;
			let tbodyCellElements = tablewidgetBodyElement.getElementsByTagName('col');

			for (let i = 0; i < theadCellElements.length; i++)
				tbodyCellElements[i].style.width = theadCellElements[i].clientWidth + 'px';
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
		window.addEventListener('resize', this.resizeEventHandler);
		this.recalculateTableWidth();
	},
	unmounted() {
		window.removeEventListener('resize', this.resizeEventHandler);
	}
});
