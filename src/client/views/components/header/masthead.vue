<!-- src/client/views/components/header/masthead.vue -->

<template>
	<span class="logo">Verdancy</span>

	<ul :class="viewStyle.stylesheet['navbar']">
		<li v-for="(item, i) in routes.items" :key="i" :class="viewStyle.stylesheet['navbar__item']">
			<router-link :to="item.path" custom v-slot="{ href, navigate, isActive, isExactActive }">
				<a :href="href" @click="navigate" :class="[viewStyle.stylesheet['navbar__item-router-link'], isActive && viewStyle.stylesheet['navbar__item-router-link--active'], isExactActive && viewStyle.stylesheet['navbar__item-router-link--exact-active']]">{{ item.title }}</a>
			</router-link>
		</li>
	</ul>
</template>

<script src="./masthead.ts" lang="ts"></script>
