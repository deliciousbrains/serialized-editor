<template>
	<span class="se-item" v-if="item.type == 'N'">
		<span class="se-item-null">{{ item.type }};</span>
	</span>
	<span class="se-item" :class="{'se-item-is-object': isObject}" v-else>
		<span class="se-item-start">
			<span class="se-item-type">{{ item.type }}:</span><span class="se-item-length" v-if="isString">{{ length }}:"</span>
		</span>
		<span class="se-item-content">
			<select v-model="editValue" v-if="item.type == 'b'">
				<option value="0">false</option>
				<option value="1">true</option>
			</select>
			<input type="text" v-model="editValue" @input="sanitizeValue" v-else>
		</span>
		<span class="se-item-end">
			<span v-if="isString">"</span><span v-if="!item.isObject">;&nbsp;</span>
		</span>
	</span>
</template>

<style>
	.se-item,
	.se-item-null,
	.se-item-start,
	.se-item-content,
	.se-item-end {
		display: inline-block;
		vertical-align: middle;
	}

	.se-item {
		padding: 5px;
		line-height: 25px;
	}
	.se-item-start,
	.se-item-null {
		width: 38px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.se-item-is-object .se-item-start {
		width: 42px;
	}
	.se-item-content input,
	.se-item-content select {
		margin: 0;
		padding: 0;
		width: 130px;
		height: 25px;
	}
	.se-item-end {
		width: 12px;
	}
</style>

<script>
	import { EventBus } from '../util/EventBus';

	export default {
		props: {
			item: {
				type: Object,
				required: true
			}
		},

		data() {
			return {
				editValue: this.item.value
			}
		},

		computed: {
			isString() {
				var stringTypes = ['s', 'o', 'O'];
				return stringTypes.indexOf(this.item.type) >= 0;
			},
			isObject() {
				var stringTypes = ['o', 'O'];
				return stringTypes.indexOf(this.item.type) >= 0;
			},
			length() {
				return this.editValue.length;
			},
			rawOutput() {
				return this.item.type + ':' + (this.isString ? this.length + ':"' : '') +
					this.editValue + (this.isString ? '"' : '') + (this.item.isObject ? '' : ';');
			}
		},

		methods: {
			sanitizeValue() {
				if (this.item.type == 'i') {
					this.editValue = this.editValue.replace(/\D/g,'');
				}
			}
		},

		watch: {
			item(newValue) {
				this.editValue = newValue.value;
			},
			editValue(newValue) {
				EventBus.$emit('value-updated');
			}
		}
	}
</script>
