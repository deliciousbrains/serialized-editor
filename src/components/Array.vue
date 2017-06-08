<template>
	<div class="array" :class="{'is-object': item.isObject}">
		<div class="array-start">
			<span v-if="!item.isObject">a</span>:{{ arrayLength }}:{
			<button type="button" class="small" @click="toggleExpanded" v-html="toggleExpandedSymbol"></button>
		</div>
		<div v-show="isExpanded">
			<array-item v-for="(value, key) in values"
					:item="value"
					:item-key="key"
					:key="key"
					@remove-item="removeItem"></array-item>
			<form class="array-add-item">
				<label>Key:</label>
				<select v-model="newItemTypeKey">
					<option value="i">integer</option>
					<option value="s">string</option>
				</select>
				<label>Value:</label>
				<select v-model="newItemTypeVal">
					<option value="s">string</option>
					<option value="i">integer</option>
					<option value="b">boolean</option>
					<option value="a">array</option>
				</select>
				<button type="button" class="primary small" @click="addItem">+</button>
			</form>
		</div>
		<div class="array-end">}</div>
	</div>
</template>

<style>
	.array.is-object,
	.array.is-object .array-start {
		display: inline;
	}
	.array-add-item {
		margin-left: 30px;
		padding: 0.75rem 0.5rem;
	}
	.array-add-item button { margin: 0; }
</style>

<script>
	import Vue from 'vue';
	import { EventBus } from '../util/EventBus';

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
					return '&downarrow;';
				}

				return '&rightarrow;';
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
			addItem() {
				var item = [];
				var itemKey = new Object();
				itemKey.type = this.newItemTypeKey;
				itemKey.value = this.newItemTypeKey == 's' ? 'key' : 0;
				item.push(itemKey);

				var itemVal = new Object();
				itemVal.type = this.newItemTypeVal;
				if (this.newItemTypeVal != 'a') {
					itemVal.value = this.itemValDefault(this.newItemTypeVal);
				} else {
					itemVal.values = [];
				}
				item.push(itemVal);

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
		}
	}
</script>
