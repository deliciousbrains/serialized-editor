<template>
	<div class="se-array">
		<div class="se-array-start">
			a:{{ arrayLength }}:{
			<button type="button" class="btn btn-default btn-xs se-toggle-expand" @click="toggleExpanded" v-html="toggleExpandedSymbol"></button>
		</div>
		<div class="se-array-content" v-show="isExpanded">
			<array-item v-for="(valueItem, key) in values"
					:item="valueItem.value"
					:item-key="valueItem.index"
					:key="key"
					@remove-item="removeItem"></array-item>
			<array-add-item @add-array-item="addItem" @remove-array-item="removeItem"></array-add-item>
		</div>
		<div class="se-array-end">}</div>
	</div>
</template>

<style>
	.se-array {
		padding: 5px;
	}
</style>

<script>
	import { EventBus } from '../util/EventBus';
	import ArrayAddItem from './ArrayAddItem.vue';

	export default {
		name: 'array',

		props: {
			item: {
				type: Object,
				required: true
			},
			expanded: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				values: [],
				nextIndex: 0,
				newItemTypeKey: 'i',
				newItemTypeVal: 's',
				isExpanded: this.expanded,
			}
		},

		computed: {
			arrayLength() {
				return this.values.length;
			},
			rawOutput() {
				return 'a:' + this.values.length + ':{';
			},
			toggleExpandedSymbol() {
				if (this.isExpanded) {
					return '<span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>';
				}

				return '<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>';
			}
		},

		created() {
			this.values = this.indexedValues(this.item.values);

			EventBus.$on('expand-all', () => {
				this.isExpanded = true;
			});
			EventBus.$on('collapse-all', () => {
				this.isExpanded = false;
			});
		},

		methods: {
			indexedValues(values) {
				var keyedValues = [],
					idx = 0;

				values.forEach(value => {
					keyedValues.push({
						index: idx,
						value: value
					});

					idx++;
				});

				this.nextIndex = idx;

				return keyedValues;
			},
			reindexValues() {
				var idx = 0;

				this.values.forEach(value => {
					value.index = idx;
					idx++;
				});

				this.nextIndex = idx;
			},
			toggleExpanded() {
				if (this.isExpanded) {
					this.isExpanded = false;
				} else {
					this.isExpanded = true;
				}
			},
			addItem(item) {
				this.values.push({
					index: this.nextIndex,
					value: item
				});

				this.reindexValues();

				EventBus.$emit('array-item-added');
			},
			removeItem(key) {
				this.values.splice(key, 1);
				this.reindexValues();

				EventBus.$emit('array-item-removed');
			},

			itemValDefault(type) {
				if (type == 'b' || type == 'i') {
					return 1
				}

				return 'value';
			}
		},

		watch: {
			item(newValue) {
				this.values = this.indexedValues(newValue.values);
			}
		},

		beforeCreate() {
			// https://vuejs.org/v2/guide/components.html#Circular-References-Between-Components
			this.$options.components.ArrayItem = require('./ArrayItem.vue')
		},

		components: {
			'array-add-item': ArrayAddItem
		}
	}
</script>
