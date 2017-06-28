import SerializedParser from '@/classes/SerializedParser';

describe('SerializedParser', () => {
	it('should handle null', () => {
		const sp = new SerializedParser('N;');
		assert.equal(sp.parse(), '{"type": "N", "value": "null"}');
	});

	it('should handle booleans', () => {
		const sp = new SerializedParser('b:1;');
		assert.equal(sp.parse(), '{"type": "b", "value": "1"}');
	});

	it('should handle integers', () => {
		const sp = new SerializedParser('i:123;');
		assert.equal(sp.parse(), '{"type": "i", "value": "123"}');
	});

	it('should handle strings', () => {
		const sp = new SerializedParser('s:7:"foo bar";');
		assert.equal(sp.parse(), '{"type": "s", "value": "foo bar"}');
	});

	it('should handle arrays', () => {
		const sp1 = new SerializedParser('a:2:{i:0;s:3:"foo";i:1;s:3:"bar";}');
		assert.equal(sp1.parse(), '{"type": "a", "values": [[{"type": "i", "value": "0"},{"type": "s", "value": "foo"}],[{"type": "i", "value": "1"},{"type": "s", "value": "bar"}]]}');

		const sp2 = new SerializedParser('a:1:{s:3:"foo";s:3:"bar";}');
		assert.equal(sp2.parse(), '{"type": "a", "values": [[{"type": "s", "value": "foo"},{"type": "s", "value": "bar"}]]}');
	});

	it('should handle objects', () => {
		const sp = new SerializedParser('O:8:"stdClass":1:{s:3:"foo";s:3:"bar";}');
		assert.equal(sp.parse(), '{"type": "O", "name": "stdClass", "values": [[{"type": "s", "value": "foo"},{"type": "s", "value": "bar"}]]}');
	});
});
