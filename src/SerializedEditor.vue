<template>
	<div class="serialized-editor" v-if="jsonDataIsValid">
		<div class="btn-group se-expand-collapse-btns" role="group" v-if="jsonData.type == 'a'">
			<button class="btn btn-default se-expand-all" @click="expandAll">Expand All</button>
			<button class="btn btn-default se-collapse-all" @click="collapseAll">Collapse All</button>
		</div>
		<array :item="jsonData" :expanded="true" v-if="jsonData.type == 'a'"></array>
		<object-item :item="jsonData" :expanded="true" v-else-if="jsonData.type.toLowerCase() == 'o'"></object-item>
		<edit-value :item="jsonData" v-else></edit-value>
	</div>
</template>

<style>
	.se-expand-collapse-btns {
		margin-bottom: 20px;
	}
</style>

<script>
	import Vue from 'vue';
	import Array from './components/Array.vue';
	import ObjectItem from './components/ObjectItem.vue';
	import EditValue from './components/EditValue.vue';
	import { EventBus } from './util/EventBus';

	export default {
		props: {
			jsonData: {
				type: Object,
				required: true
			}
		},

		data() {
			return {
				allComponents: []
			}
		},

		computed: {
			jsonDataIsValid() {
				return this.jsonData && Object.keys(this.jsonData).length !== 0;
			}
		},

		created() {
			EventBus.$on(['value-updated', 'array-item-added', 'array-item-removed'], () => {
				Vue.nextTick(() => {
					this.generateOutput();
				});
			});
		},

		mounted() {
			this.generateOutput();
		},

		methods: {
			generateOutput() {
				this.allComponents = [];
				this.findChildren(this);
				var output = this.allComponents.join('');

				this.$emit('output', output);
			},
			findChildren(component) {
				if (component.$children) {
					if (component.rawOutput) {
						this.allComponents.push(component.rawOutput);
					}

					component.$children.forEach(child => {
						// Don't include ObjectItem's name <edit-value> in the list of array values
						if (child.isObject) {
							return;
						}

						this.findChildren(child);
					});

					if (component.values) {
						// Append closing bracket for arrays/objects
						this.allComponents.push('}');
					}
				}
			},

			expandAll() {
				EventBus.$emit('expand-all');
			},
			collapseAll() {
				EventBus.$emit('collapse-all');
			}
		},

		watch: {
			jsonData(newValue) {
				Vue.nextTick(() => {
					this.generateOutput();
				});
			}
		},

		components: {
			'array': Array,
			'object-item': ObjectItem,
			'edit-value': EditValue
		}
	}
</script>
