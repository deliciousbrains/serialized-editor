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

	it('should be able to re-serialize data', () => {
		const vm = util.mountComponent(SerializedEditor, {
			jsonData: {"type": "s", "value": "foo bar"}
		});

		assert.equal(vm.generateOutput(), 's:7:"foo bar";');
	});

	it('should be able to handle multiple children', () => {
		const vm = util.mountComponent(SerializedEditor, {
			jsonData: {"type": "a", "values": [[{"type": "i", "value": "0"},{"type": "s", "value": "foo"}],[{"type": "i", "value": "1"},{"type": "s", "value": "bar"}]]}
		});

		assert.equal(vm.generateOutput(), 'a:2:{i:0;s:3:"foo";i:1;s:3:"bar";}');
	});
});
