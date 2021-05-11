'use strict';

import { createRouter, createWebHistory, RouterOptions } from 'vue-router';

export const router = createRouter({
	history: createWebHistory(/*process.env.BASE_URL*/),
	routes: [
		{ path: '/', component: () => import('./../client/views/home/home.vue') },
		{ path: '/about', component: () => import('./../client/views/about/about.vue') }
	]
} as RouterOptions);
