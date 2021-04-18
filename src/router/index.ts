'use strict';

import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: () => import('./../client/views/home/home.vue') },
		{ path: '/about', component: () => import('./../client/views/about/about.vue') }
	]
});
