'use strict';

const path = require('path');

module.exports = {
	'vue': '@vue/runtime-dom',
	'@components': path.resolve(__dirname, '../../../src/client/views/components/'),
	'timcowebapps/common.utils': path.resolve(__dirname, '../../../node_modules', '@timcowebapps/common.utils'),
	'timcowebapps/common.ooscss': path.resolve(__dirname, '../../../node_modules', '@timcowebapps/common.ooscss'),
	'timcowebapps/common.smascss.styles': path.resolve(__dirname, '../../../node_modules', '@timcowebapps/common.smascss.styles')
};
