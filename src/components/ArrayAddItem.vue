<template>
	<form class="se-array-add-item">
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
		<button type="button" class="btn btn-primary btn-xs se-array-add-item-btn" @click="addItem" title="Add item">
			<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
		</button>
	</form>
</template>

<style>
	.se-array-add-item {
		margin-left: 30px;
		padding: 0.75rem 0.5rem;
	}
	.se-array-add-item button { margin: 0; }
</style>

<script>
	export default {
		name: 'array-add-item',

		data() {
			return {
				newItemTypeKey: 'i',
				newItemTypeVal: 's',
			}
		},

		methods: {
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

				this.$emit('add-array-item', item);
			},
			removeItem(key) {
				this.$emit('remove-array-item', key);
			},

			itemValDefault(type) {
				if (type == 'b' || type == 'i') {
					return 1
				}

				return 'value';
			}
		}
	}
</script>
