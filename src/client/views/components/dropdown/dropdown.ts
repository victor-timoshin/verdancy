'use strict';

import { defineComponent } from 'vue';

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
