'use strict';

interface String {
	format(...replacements: string[]): string;
}

(String.prototype as any).format = function() {
	var args: IArguments = arguments;
	return this.replace(/{(\d+)}/g, (match: string, number: number) => {
		return typeof args[number] != 'undefined'
			? args[number]
			: match;
	});
};
