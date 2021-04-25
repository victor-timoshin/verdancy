<!-- src/client/views/components/dropdown/dropdown.vue -->

<template>
	<div :class="viewstyle.stylesheet['dropdown-wrap']" @click="handleClick">
		<span>{{config.placeholder}}</span>
		<ul :class="viewstyle.bem.block(viewstyle.stylesheet, 'dropdown').element('list').toStr()" v-if="currentState">
			<li :class="viewstyle.bem.block(viewstyle.stylesheet, 'dropdown').element('listitem').toStr()" v-for="(item, i) in config.options" :key="i" @click="setCurrentSelected(item)">
				<span>{{ item.value }}</span>
			</li>
		</ul>
	</div>
</template>

<script src="./dropdown.ts" lang="ts"></script>
