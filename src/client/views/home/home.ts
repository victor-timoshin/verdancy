'use strict';

import * as _ from 'underscore';
import { defineComponent, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Methodology } from '@timcowebapps/common.ooscss';
import { api, bus, IStorage } from './../../../core/_exports';
import { ISocketProvider } from '../../plugins/socketprovider.interface';
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
					field: 'price',
					label: 'Цена'
				}, {
					field: 'quantity',
					label: 'Количество'
				}, {
					field: 'total',
					label: 'Общее'
				}],
				data: []
			}
		}
	},
	setup(props: any) {
		//#region Injects

		const storage = inject('storage') as IStorage;
		const databusService = inject('databusService') as bus.IDatabusService;
		const binanceService = inject('binanceService') as api.IBinanceService;
		const binanceSocketProvider = inject('binanceSocketProvider') as ISocketProvider;

		//#endregion

		//#region Refs

		let symbolname = ref<string>(storage.symbolname);
		let orderbookResponse = ref<api.IOrderBookResponse>(api.initialOrderBook);

		//#endregion

		let fetchDepth = async (symbol: string): Promise<void> => {
			try {
				orderbookResponse.value = await binanceService.fetchDepth({ symbol: symbol, limit: 100 });
			} catch (err: any) {
				console.log(err);
			}
		}

		let fetchDepthStream = async (): Promise<void> => {
			try {
				orderbookResponse.value = await binanceService.fetchDepthStream(binanceSocketProvider);
			} catch (err: any) {
				console.log(err);
			}
		}

		watch(() => orderbookResponse.value, (newstream: api.IOrderBookResponse, oldstream: api.IOrderBookResponse) => {
			if (!newstream)
				return;

			if (storage.symbolnameMutated) {
				binanceSocketProvider.reopen(storage.symbolname, '1000ms');
				storage.symbolnameMutated = false;
			}

			if (Boolean(storage.autoupdate).valueOf()) {
				databusService.publish('binance_depth_stream', { payload: newstream });
				fetchDepthStream();
			}
		});

		onMounted(() => {
			databusService.subscribe<{ symbol: string }>('binance_active_symbol', { compid: new Date().getTime() }, (data) => {
				if (_.isEqual(storage.symbolname, data.symbol))
					return;

				storage.symbolname = data.symbol;
				storage.symbolnameMutated = true;
			});

			fetchDepth(storage.symbolname);
		});

		onBeforeUnmount(() => {
			//databusService.unsubscribe('binance_active_symbol', { compid });
		});

		return {
			symbolname, orderbookResponse
		}
	}
});
