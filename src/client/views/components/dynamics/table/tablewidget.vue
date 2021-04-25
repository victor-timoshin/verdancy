<!-- src/client/views/components/dynamics/table/tablewidget.vue -->

<template>
	<table :class="viewstyle.stylesheet['table-scrollable']" ref="TableWidgetRef">
		<thead>
			<tr>
				<th v-for="(column, columnIdx) in columns" :key="columnIdx" style="width: 25%">
					{{ column.label }}
				</th>
			</tr>
		</thead>

		<tbody v-if="data.length > 0" :class="viewstyle.bem.block(viewstyle.stylesheet, 'table-scrollable').element('body').toStr()">
			<tr v-for="(row, rowIdx) in data" :key="rowIdx">
				<td v-for="(column, columnIdx) in columns" :key="columnIdx" style="width: 25%">
					{{ row[column.field] }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script src="./tablewidget.ts" lang="ts"></script>
