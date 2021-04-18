'use strict';

export enum IndexSymbolEnum {
	BTCUSDT = 0,
	BNBBTC,
	ETHBTC
};

export namespace IndexSymbolUtils {
	export const enumToArr = () => {
		const array: Array<string> = [];
		for (const [key, value] of Object.entries(IndexSymbolEnum)) {
			if (!Number.isNaN(Number(key)))
				continue;

			array.push(key);
		}

		return array;
	}

	export const enumToStr = (key: number) => {
		return IndexSymbolEnum[key] as string;
	}
}
