import { setValue, getValue } from './utils/compile.utils';
import Watcher from './watcher';

class CompileDirective {
	constructor() {}
	// v-text
	text(node, expr) {
		node.textContent = getValue(this.vm, expr);
		new Watcher(this.vm, expr, value => {
			node.textContent = value;
		});
	}
	// v-html
	html(node, expr) {
		node.innerHTML = getValue(this.vm, expr);
		new Watcher(this.vm, expr, value => {
			node.innerHTML = value;
		});
	}
	// v-model
	model(node, expr) {
		node.value = getValue(this.vm, expr);
		new Watcher(this.vm, expr, value => {
			node.value = value;
		});
		node.addEventListener('input', event => {
			const val = event.target.value;
			setValue(this.vm, expr, val);
		});
	}
	// v-on
	on(node, type, expr) {
		const method = getValue(this.vm, expr);
		node.addEventListener(type, method);
	}
	// v-bind
	bind(node, type, expr) {
        node.setAttribute(type, getValue(this.vm, expr)||expr);
        node.removeAttribute(':' + type);
	}
}

export default CompileDirective;
