'use strict';

import path from 'path';

export const getAlias = (rootDir: string): {
	[key: string]: string
} => {
	return {
		'vue': '@vue/runtime-dom',
		'@components': path.resolve(rootDir, './src/client/views/components/')
	}
};
