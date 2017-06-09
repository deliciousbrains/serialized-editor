<template>
	<div class="serialized-editor" v-if="jsonDataIsValid">
		<div class="btn-group se-expand-collapse-btns" role="group" v-if="jsonData.type == 'a'">
			<button class="btn btn-default se-expand-all" @click="expandAll">Expand All</button>
			<button class="btn btn-default se-collapse-all" @click="collapseAll">Collapse All</button>
		</div>
		<array :item="jsonData" :expanded="true" v-if="jsonData.type == 'a'"></array>
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
						this.findChildren(child);
					});

					if (component.values) {
						// Append closing bracket for array's
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
			'edit-value': EditValue
		}
	}
</script>
