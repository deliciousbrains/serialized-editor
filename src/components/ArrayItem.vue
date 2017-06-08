<template>
	<div class="array-item">
		<span v-for="(value, key) in item">
			<array :item="value" v-if="value.type == 'a'"></array>
			<edit-value :item="value" v-else></edit-value>
		</span>
		<button class="secondary small" @click="removeItem">x</button>
	</div>
</template>

<style>
	.array-item {
		margin-left: 30px;
	}
	.array-item button { margin: 0; }
</style>

<script>
	import Array from './Array.vue';
	import EditValue from './EditValue.vue';

	export default {
		props: ['item', 'itemKey'],

		methods: {
			removeItem() {
				this.$emit('remove-item', this.itemKey);
			}
		},

		components: {
			'array': Array,
			'edit-value': EditValue
		}
	}
</script>
