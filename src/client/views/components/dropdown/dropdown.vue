<!-- src/client/views/components/dropdown/dropdown.vue -->

<template>
	<div class="dropdown" @click="handleClick">
		<span>{{config.placeholder}}</span>
		<ul class="dropdown-options" v-if="currentState">
			<li v-for="(item, i) in config.options" :key="i" @click="setCurrentSelected(item)">
				<span>{{ item.value }}</span>
			</li>
		</ul>
	</div>
</template>

<script src="./dropdown.ts" lang="ts"></script>
