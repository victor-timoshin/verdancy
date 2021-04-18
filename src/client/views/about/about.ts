'use strict';

import { defineComponent } from 'vue';
import Dropdown from '@components/dropdown/dropdown.vue';
import { api } from '../../../core/_exports';

export default defineComponent({
	name: 'AboutPage',
	inject: ['PubSubRegistry'],
	components: {
		Dropdown
	},

	data(): any {
		return {
			binanceDropdownSymbols: {
				placeholder: '--Please Select--',
				options: [{
					value: api.IndexSymbolUtils.enumToStr(api.IndexSymbolEnum.BTCUSDT)
				}, {
					value: api.IndexSymbolUtils.enumToStr(api.IndexSymbolEnum.BNBBTC)
				}, {
					value: api.IndexSymbolUtils.enumToStr(api.IndexSymbolEnum.ETHBTC)
				}]
			}
		}
	},

	methods: {
		getBinanceSymbolOption(option: any) {
			this.binanceDropdownSymbols.placeholder = option.value;
			this.PubSubRegistry.publish('binance_active_symbol', { symbol: option.value });
		}
	}
});
