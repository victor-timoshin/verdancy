<!-- src/client/views/components/dynamics/table/tablewidget.vue -->

<template>
	<div :class="viewstyle.stylesheet['tablewidget-scrollable']">
		<div :class="viewstyle.bem.block(viewstyle.stylesheet, 'tablewidget-scrollable').element('header').toStr()">
			<table :class="viewstyle.stylesheet['tablewidget-header']" ref="tablewidgetHeadRef">
				<thead :class="viewstyle.bem.block(viewstyle.stylesheet, 'tablewidget-header').element('thead').toStr()">
					<tr :class="viewstyle.bem.block(viewstyle.stylesheet, 'tablewidget-header').element('thead-row').toStr()">
						<th v-for="(column, columnIdx) in columns" :key="columnIdx" :class="viewstyle.bem.block(viewstyle.stylesheet, 'tablewidget-header').element('thead-cell').toStr()">
							<div :class="viewstyle.stylesheet['label']">
								{{ column.label }}
							</div>
						</th>
					</tr>
				</thead>
			</table>
		</div>

		<div :class="viewstyle.bem.block(viewstyle.stylesheet, 'tablewidget-scrollable').element('content').toStr()" ref="tablewidgetRef">
			<table :class="viewstyle.stylesheet['tablewidget-content']" ref="tablewidgetBodyRef">
				<colgroup>
					<col />
					<col />
					<col />
				</colgroup>

				<tbody v-if="data.length > 0" :class="viewstyle.bem.block(viewstyle.stylesheet, 'tablewidget-content').element('tbody').toStr()">
					<tr v-for="(row, rowIdx) in data" :key="rowIdx" :class="viewstyle.bem.block(viewstyle.stylesheet, 'tablewidget-content').element('tbody-row').toStr()">
						<td v-for="(column, columnIdx) in columns" :key="columnIdx" :class="viewstyle.bem.block(viewstyle.stylesheet, 'tablewidget-content').element('tbody-col').toStr()">
							{{ row[column.field] }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script src="./tablewidget.ts" lang="ts"></script>
