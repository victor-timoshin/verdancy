<!-- src/client/views/components/dynamics/table/tablewidget.vue -->

<template>
	<table :class="viewStyle.stylesheet['table-scrollable']" ref="TableWidgetRef">
		<thead>
			<tr>
				<th v-for="(column, columnIdx) in columns" :key="columnIdx" style="width: 25%">
					{{ column.label }}
				</th>
			</tr>
		</thead>

		<tbody v-if="data.length > 0" :class="viewStyle.stylesheet['table-scrollable__body']">
			<tr v-for="(row, rowIdx) in data" :key="rowIdx">
				<td v-for="(column, columnIdx) in columns" :key="columnIdx" style="width: 25%">
					{{ row[column.field] }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script src="./tablewidget.ts" lang="ts"></script>
