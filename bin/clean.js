'use strict';

const path = require('path');
const del = require('del');
const buildConfg = require('../configuration/buildconfig.js');

const items = [
	path.resolve(__dirname, '../', buildConfg.paths.output.base)
];

(async () => {
	items.forEach((toDelete, idx, array) => {
		del([toDelete]).then((paths) => {
			if (paths.length > 0)
				console.log(toDelete + ' successfully removed');
			else
				console.log('Error while deleting ' + toDelete + ' (empty?)');
		});
	});
})();
