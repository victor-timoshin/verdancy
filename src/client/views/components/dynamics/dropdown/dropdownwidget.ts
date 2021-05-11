'use strict';

import { defineComponent } from 'vue';
import { Methodology } from '@timcowebapps/common.ooscss';
import { subcomp } from '../../../partials/lazy/_exports';

export default defineComponent({
	name: subcomp.SubcomponentNameUtils.enumToStr(subcomp.SubcomponentNameEnum.DropdownWidget),
	props: {
		defaultState: {
			type: Boolean,
			default: false
		},
		config: {
			type: Object,
			default: {
				placeholder: '--Please Select--',
				options: {
					type: Array,
					default: () => []
				}
			}
		}
	},

	data(): any {
		return {
			viewstyle: {
				stylesheet: require('./dropdownwidget.scss').default,
				bem: Methodology.Bem.Entities
			},
			currentState: this.defaultState
		}
	},

	methods: {
		handleClick() {
			this.currentState = !this.currentState;
		},
		setCurrentSelected(option: any) {
			this.$emit('setSelected', option);
		}
	}
});
