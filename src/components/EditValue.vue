<template>
	<span class="se-edit-value">
		<span v-if="item.type == 'N'">
			{{ item.type }};
		</span>
		<span v-else>
			{{ item.type }}:<span v-if="isString">{{ length }}:"</span>
			<select v-model="editValue" v-if="item.type == 'b'">
				<option value="0">false</option>
				<option value="1">true</option>
			</select>
			<input type="text" v-model="editValue" @input="sanitizeValue" v-else>
			<span v-if="isString">"</span><span v-if="!item.isObject">;&nbsp;</span>
		</span>
	</span>
</template>

<style>
	.se-edit-value input {
		margin: 0.25rem 0;
		padding: 0.1rem 0.5rem;
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
