'use strict';

import * as _ from 'underscore';
import { defineComponent } from 'vue';
import Dropdown from '@components/dropdown/dropdown.vue';
import { Methodology } from '@timcowebapps/common.ooscss';
import { api } from '../../../core/_exports';

export default defineComponent({
	name: 'AboutPage',
	inject: ['databusService'],
	components: {
		Dropdown
	},
	data(): any {
		return {
			viewstyle: {
				stylesheet: require('./../../entry.scss').default,
				bem: Methodology.Bem.Entities
			},
			binanceDropdownSymbols: {
				placeholder: localStorage.symbolname || 'BTCUSDT',
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
			this.databusService.publish('binance_active_symbol', { symbol: option.value });
		}
	}
});
