<!-- src/client/views/home/home.vue -->

<template>
	<div :class="viewstyle.stylesheet['container']">
		<div :class="viewstyle.stylesheet['row']">
			<div :class="viewstyle.bem.block(viewstyle.stylesheet, 'column').element().modifiers(['lg-12', 'md-12', 'sm-12', 'xs-12'])">
				<h1>Home</h1>

				<TableWidget :columns="datatable.columns" :data="orderBookData.bids" />
			</div>
		</div>
	</div>
</template>

<script src="./home.ts" lang="ts"></script>
