'use strict';

import path from 'path';
import del from 'del';
import { buildConfg } from '../configuration/buildconfig';

const items = [
	path.resolve(__dirname, '../', buildConfg.paths.output.base)
];

items.forEach((toDelete: string, idx: number, array: string[]) => {
	del([toDelete]).then((paths: string[]) => {
		if (paths.length > 0)
			console.log(toDelete + ' successfully removed');
		else
			console.log('Error while deleting ' + toDelete + ' (empty?)');
	});
});
