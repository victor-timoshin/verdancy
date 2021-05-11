'use strict';

export enum SubcomponentNameEnum {
	TableWidget = 0,
	DropdownWidget = 1
};

export namespace SubcomponentNameUtils {
	export const enumToArr = () => {
		const array: Array<string> = [];
		for (const [key, value] of Object.entries(SubcomponentNameEnum)) {
			if (!Number.isNaN(Number(key)))
				continue;

			array.push(key);
		}

		return array;
	}

	export const enumToStr = (key: number) => {
		return SubcomponentNameEnum[key] as string;
	}
}
