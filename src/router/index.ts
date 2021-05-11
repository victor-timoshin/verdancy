'use strict';

import { createRouter, createWebHistory, RouterOptions } from 'vue-router';

export const router = (state: any) => {
	return createRouter({
		history: createWebHistory(Boolean(state.ssr).valueOf() ? undefined : 'verdancy'),
		routes: [
			{ path: '/', component: () => import('./../client/views/home/home.vue') },
			{ path: '/about', component: () => import('./../client/views/about/about.vue') }
		]
	} as RouterOptions)
}
