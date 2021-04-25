<!-- src/client/views/components/header/masthead.vue -->

<template>
	<div :class="viewstyle.stylesheet['container']">
		<div :class="viewstyle.stylesheet['row']">
			<div :class="viewstyle.bem.block(viewstyle.stylesheet, 'column').element().modifiers(['lg-12', 'md-12', 'sm-12', 'xs-12'])">
				<span class="logo">Verdancy</span>

				<ul :class="viewstyle.stylesheet['navbar']">
					<li v-for="(item, i) in routes.items" :key="i" :class="viewstyle.bem.block(viewstyle.stylesheet, 'navbar').element('item').toStr()">
						<router-link :to="item.path" custom v-slot="{ href, navigate, isActive, isExactActive }">
							<a :href="href" @click="navigate" :class="viewstyle.bem.block(viewstyle.stylesheet, 'navbar').element('item-router-link').modifiers([
								isActive && 'active',
								isExactActive && 'exact-active'
							])">{{ item.title }}</a>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script src="./masthead.ts" lang="ts"></script>
