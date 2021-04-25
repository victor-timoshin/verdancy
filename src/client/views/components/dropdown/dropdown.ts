'use strict';

import { defineComponent } from 'vue';
import { Methodology } from '@timcowebapps/common.ooscss';

export default defineComponent({
	name: 'DropDown',
	props: {
		defaultState: {
			type: Boolean,
			default: false
		},
		config: {
			type: Object,
			default: {
				placeholder: '--Please Select--',
				options: []
			}
		}
	},

	data(): any {
		return {
			viewstyle: {
				stylesheet: require('./dropdown.scss').default,
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
