<!-- src/client/views/home/home.vue -->

<template>
	<section :class="[viewstyle.stylesheet['mt-xl-2'], viewstyle.stylesheet['mb-lg']]">
		<div :class="viewstyle.stylesheet['container']">
			<div :class="viewstyle.stylesheet['row']">
				<div :class="viewstyle.bem.block(viewstyle.stylesheet, 'column').element().modifiers(['lg-12', 'md-12', 'sm-12', 'xs-12'])">
					{{ symbolname }}
				</div>
			</div>

			<div :class="viewstyle.stylesheet['row']">
				<div :class="[
					viewstyle.bem.block(viewstyle.stylesheet, 'column').element().modifiers(['lg-6', 'md-6', 'sm-12', 'xs-12']),
					viewstyle.stylesheet['mb-md']
				]">
					<TableWidget :columns="datatable.columns" :data="orderbookResponse.bids" />
				</div>

				<div :class="[
					viewstyle.bem.block(viewstyle.stylesheet, 'column').element().modifiers(['lg-6', 'md-6', 'sm-12', 'xs-12']),
					viewstyle.stylesheet['mb-md']
				]">
					<TableWidget :columns="datatable.columns" :data="orderbookResponse.asks" />
				</div>
			</div>
		</div>
	</section>
</template>

<script src="./home.ts" lang="ts"></script>
