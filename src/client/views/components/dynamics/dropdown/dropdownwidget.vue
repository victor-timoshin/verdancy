<!-- src/client/views/components/dynamics/dropdown/dropdownwidget.vue -->

<template>
	<div :class="viewstyle.stylesheet['dropdown']" @click="handleClick">
		<div :class="viewstyle.bem.block(viewstyle.stylesheet, 'dropdown').element('trigger').toStr()">
			<span>{{config.placeholder}}</span>
		</div>

		<ul :class="viewstyle.bem.block(viewstyle.stylesheet, 'dropdown').element('list').toStr()" v-if="currentState">
			<li :class="viewstyle.bem.block(viewstyle.stylesheet, 'dropdown').element('listitem').toStr()" v-for="(item, i) in config.options" :key="i" @click="setCurrentSelected(item)">
				<span>{{ item.value }}</span>
			</li>
		</ul>
	</div>
</template>

<script src="./dropdownwidget.ts" lang="ts"></script>
