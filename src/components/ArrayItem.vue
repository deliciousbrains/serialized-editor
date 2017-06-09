<template>
	<div class="se-array-item">
		<span v-for="(value, key) in item">
			<array :item="value" v-if="value.type == 'a'"></array>
			<edit-value :item="value" v-else></edit-value>
		</span>
		<button class="btn btn-danger btn-xs se-array-remove-item-btn" @click="removeItem" title="Remove item">
			<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
		</button>
	</div>
</template>

<style>
	.se-array-item {
		margin-left: 30px;
	}
	.se-array-item button { margin: 0; }
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
