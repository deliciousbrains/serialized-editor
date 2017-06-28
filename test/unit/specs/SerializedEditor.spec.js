import util from '../util';
import SerializedEditor from '@/SerializedEditor.vue';

describe('SerializedEditor.vue', () => {
	it('should not show anything if JSON data is empty', () => {
		const vm = util.mountComponent(SerializedEditor, {
			jsonData: {}
		});

		assert.isFalse(vm.jsonDataIsValid);
		assert.isEmpty(vm.$el.textContent);
	});

	it('should have an empty output by default', () => {
		const vm = util.mountComponent(SerializedEditor, {
			jsonData: {}
		});

		assert.isEmpty(vm.generateOutput());
	});
});
