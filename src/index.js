import SerializedParser from './classes/SerializedParser';
import SerializedEditor from './SerializedEditor.vue';

export default {
	install (Vue) {
		Vue.component('serialized-editor', SerializedEditor);
	}
}

export { SerializedParser, SerializedEditor };