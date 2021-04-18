<!-- src/client/views/home/home.vue -->

<template>
	<div>
		<h1>Home</h1>

		<TableWidget :columns="datatable.columns" :data="orderBookData.bids" />
	</div>
</template>

<script src="./home.ts" lang="ts"></script>
