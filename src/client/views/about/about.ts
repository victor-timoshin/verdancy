'use strict';

import * as _ from 'underscore';
import { defineComponent } from 'vue';
import { Methodology } from '@timcowebapps/common.ooscss';
import { api } from '../../../core/_exports';
import { subcomp } from '../partials/lazy/_exports';

export default defineComponent({
	name: 'AboutPage',
	inject: ['binanceSocketProvider', 'databusService'],
	components: subcomp.SubcomponentLoadable.dynamicImport(),
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
			this.binanceSocketProvider.emit(newdata);
		}
	}
});
