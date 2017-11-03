<template>
	<div class="se-array-item">
		<span class="se-array-item-col" :class="{'se-contains-array': value.type == 'a'}" v-for="(value, key) in item">
			<array :item="value" v-if="value.type == 'a'"></array>
			<object-item :item="value" v-else-if="value.type.toLowerCase() == 'o'"></object-item>
			<edit-value :item="value" v-else></edit-value>
		</span>
		<span class="se-array-item-col">
			<span class="se-item">
				<button class="btn btn-danger btn-xs se-array-remove-item-btn" @click="removeItem" title="Remove item">
					<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
				</button>
			</span>
		</span>
	</div>
</template>

<style>
	.se-array-item {
		margin-left: 30px;
	}
	.se-array-remove-item-btn {
		margin: 0;
	}
</style>

<script>
	import Array from './Array.vue';
	import ObjectItem from './ObjectItem.vue';
	import EditValue from './EditValue.vue';

	export default {
		name: 'array-item',

		props: ['item', 'itemKey'],

		created() {
			this.maybeUpdateArrayKey();
		},

		methods: {
			maybeUpdateArrayKey() {
				if (this.item[0].type == 'i') {
					this.item[0].value = this.itemKey;
				}
			},
			removeItem() {
				this.$emit('remove-item', this.itemKey);
			}
		},

		components: {
			'array': Array,
			'object-item': ObjectItem,
			'edit-value': EditValue
		},

		watch: {
			item(newValue) {
				this.maybeUpdateArrayKey();
			}
		}
	}
</script>
