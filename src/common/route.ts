'use strict';

import { IRouteMeta } from './routemeta';

export interface IRoute {
	path: string;
	handler: string;
	ssr: boolean;
	meta: IRouteMeta;
};
