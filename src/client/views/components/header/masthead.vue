<!-- src/client/views/components/header/masthead.vue -->

<template>
	<header :class="viewstyle.stylesheet['navbar']">
		<div :class="viewstyle.stylesheet['container']">
			<div :class="viewstyle.stylesheet['row']">
				<div :class="viewstyle.bem.block(viewstyle.stylesheet, 'column').element().modifiers(['lg-12', 'md-12', 'sm-12', 'xs-12'])">
					<ul :class="viewstyle.bem.block(viewstyle.stylesheet, 'navbar').element('list').toStr()">
						<li v-for="(item, i) in routes.items" :key="i" :class="viewstyle.bem.block(viewstyle.stylesheet, 'navbar').element('listitem').toStr()">
							<router-link :to="item.path" custom v-slot="{ href, navigate, isActive, isExactActive }">
								<a :href="href" @click="navigate" :class="viewstyle.bem.block(viewstyle.stylesheet, 'navbar').element('listitem-router-link').modifiers([
									isActive && 'active',
									isExactActive && 'exact-active'
								])">{{ item.title }}</a>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</header>
</template>

<script src="./masthead.ts" lang="ts"></script>
