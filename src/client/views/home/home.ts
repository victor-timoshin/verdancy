'use strict';

import * as _ from 'underscore';
import { defineComponent, inject, onMounted, ref, watch } from 'vue';
import { Methodology } from '@timcowebapps/common.ooscss';
import { api, bus } from './../../../core/_exports';
import { subcomp } from '../partials/lazy/_exports';

export default defineComponent({
	name: 'HomePage',
	components: subcomp.SubcomponentLoadable.dynamicImport(),
	data(): any {
		return {
			viewstyle: {
				stylesheet: require('./../../entry.scss').default,
				bem: Methodology.Bem.Entities
			},
			datatable: {
				columns: [{
					field: 'quantity',
					label: 'Кол-во'
				}, {
					field: 'price',
					label: 'Цена'
				}],
				data: []
			}
		}
	},
	setup(props) {
		//#region Injects

		let pubSubRegistry: bus.IPubSubRegistry = inject('PubSubRegistry') as any;
		let binanceService: api.IBinanceService = inject('BinanceService') as any;

		let socketProvider = inject('SocketProvider') as any;

		//#endregion

		let orderBookData = ref(api.initialOrderBook);

		const fetchDepthSnapshot = async (symbol: string) => {
			try {
				orderBookData.value = await binanceService.fetchDepthSnapshot({ symbol: symbol, limit: 100 });
			} catch (err: any) {
				console.log(err);
			}
		}

		pubSubRegistry.subscribe('binance_active_symbol', (data: any) => {
			fetchDepthSnapshot(data.symbol);
		});

		const fetchDepthStream = async () => {
			try {
				orderBookData.value = await binanceService.fetchDepthStream(socketProvider);
			} catch (err: any) {
				console.log(err);
			}
		}

		watch(() => orderBookData.value, (newstream: api.IOrderBook, oldstream: api.IOrderBook) => {
			if (!newstream)
				return;

			fetchDepthStream();
		});

		onMounted(() => {
			fetchDepthSnapshot('BTCUSDT'/* default */);
		});

		return {
			orderBookData
		}
	},
});
