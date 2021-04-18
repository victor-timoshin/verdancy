<!-- src/client/views/about/about.vue -->

<template>
	<h1>About</h1>

	<Dropdown :config="binanceDropdownSymbols" @setSelected="getBinanceSymbolOption($event)" />
</template>

<script src="./about.ts" lang="ts"></script>
