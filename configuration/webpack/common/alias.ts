'use strict';

import path from 'path';

export const getAlias = (rootDir: string): {
	[key: string]: string
} => {
	return {
		'vue': '@vue/runtime-dom',
		'@components': path.resolve(rootDir, './src/client/views/components/'),
		'timcowebapps/common.utils': path.resolve(rootDir, 'node_modules', '@timcowebapps', 'common.utils'),
		'timcowebapps/common.ooscss': path.resolve(rootDir, 'node_modules', '@timcowebapps', 'common.ooscss'),
		'timcowebapps/common.smascss.styles': path.resolve(rootDir, 'node_modules', '@timcowebapps', 'common.smascss.styles')
	}
};
