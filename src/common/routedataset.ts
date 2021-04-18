'use strict';

import { IRouteMap } from './routemap';

export const RouteDataset: IRouteMap = {
	home: {
		path: '/',
		handler: 'homeHandler',
		ssr: true,
		meta: { title: 'Главная', description: '' }
	},
	about: {
		path: '/about',
		handler: 'aboutHandler',
		ssr: true,
		meta: { title: 'Настройка конфигурации', description: '' }
	}
};
