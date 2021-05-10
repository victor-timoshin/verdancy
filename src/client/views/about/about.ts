'use strict';

import * as _ from 'underscore';
import { defineComponent } from 'vue';
import Dropdown from '@components/dropdown/dropdown.vue';
import { Methodology } from '@timcowebapps/common.ooscss';
import { api } from '../../../core/_exports';

export default defineComponent({
	name: 'AboutPage',
	inject: ['binanceSocketIOProvider', 'databusService'],
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
			const newdata = {
				symbol: option.value
			};

			this.binanceDropdownSymbols.placeholder = option.value;
			this.databusService.publish('binance_active_symbol', newdata);
			// Отправка на сервер
			this.binanceSocketIOProvider.emit('diff_depth_stream__update_symbol', newdata);
		}
	}
});
