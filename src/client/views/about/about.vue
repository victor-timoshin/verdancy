<!-- src/client/views/about/about.vue -->

<template>
	<div :class="viewstyle.stylesheet['container']">
			<div :class="viewstyle.stylesheet['row']">
				<div :class="viewstyle.bem.block(viewstyle.stylesheet, 'column').element().modifiers(['lg-12', 'md-12', 'sm-12', 'xs-12'])">
					<h1>About</h1>

					<Dropdown :config="binanceDropdownSymbols" @setSelected="getBinanceSymbolOption($event)" />
				</div>
			</div>
		</div>
</template>

<script src="./about.ts" lang="ts"></script>
