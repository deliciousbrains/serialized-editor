<template>
	<div class="se-array" :class="{'se-array-is-object': item.isObject}">
		<div class="se-array-start">
			<span v-if="!item.isObject">a</span>:{{ arrayLength }}:{
			<button type="button" class="btn btn-default btn-xs se-toggle-expand" @click="toggleExpanded" v-html="toggleExpandedSymbol"></button>
		</div>
		<div class="se-array-content" v-show="isExpanded">
			<array-item v-for="(value, key) in values"
					:item="value"
					:item-key="key"
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
	.se-array-is-object,
	.se-array-is-object .se-array-start {
		display: inline;
	}
</style>

<script>
	import Vue from 'vue';
	import { EventBus } from '../util/EventBus';
	import ArrayAddItem from './ArrayAddItem.vue';

	export default {
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
				values: this.item.values,
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
				return (this.item.isObject ? '' : 'a') + ':' + this.values.length + ':{';
			},
			toggleExpandedSymbol() {
				if (this.isExpanded) {
					return '<span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>';
				}

				return '<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>';
			}
		},

		created() {
			EventBus.$on('expand-all', () => {
				this.isExpanded = true;
			});
			EventBus.$on('collapse-all', () => {
				this.isExpanded = false;
			});
		},

		methods: {
			toggleExpanded() {
				if (this.isExpanded) {
					this.isExpanded = false;
				} else {
					this.isExpanded = true;
				}
			},
			addItem(item) {
				this.values.push(item);
				EventBus.$emit('array-item-added');
			},
			removeItem(key) {
				this.values.splice(key, 1);
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
				this.values = newValue.values;
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
