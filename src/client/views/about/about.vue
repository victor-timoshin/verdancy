<!-- src/client/views/about/about.vue -->

<template>
	<section :class="[viewstyle.stylesheet['mt-xl-2'], viewstyle.stylesheet['mb-lg']]">
		<div :class="viewstyle.stylesheet['container']">
			<div :class="viewstyle.stylesheet['row']">
				<div :class="viewstyle.bem.block(viewstyle.stylesheet, 'column').element().modifiers(['lg-12', 'md-12', 'sm-12', 'xs-12'])">
					<Dropdown :config="binanceDropdownSymbols" @setSelected="getBinanceSymbolOption($event)" />
				</div>
			</div>
		</div>
	</section>
</template>

<script src="./about.ts" lang="ts"></script>
