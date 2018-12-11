import { setValue, getValue } from './utils/compile.utils';
import Watcher from './watcher';

class CompileDirective {
	constructor() {}
	text(node, expr) {
		node.textContent = getValue(this.vm, expr);
		new Watcher(this.vm, expr, value => {
			node.textContent = value;
		});
	}
	html(node, expr) {
		node.innerHTML = getValue(this.vm, expr);
		new Watcher(this.vm, expr, value => {
			node.innerHTML = value;
		});
	}
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
	on(node, type, expr) {
		const method = getValue(this.vm, expr);
		node.addEventListener(type, method);
	}
	bind(node, type, expr) {
        node.setAttribute(type, getValue(this.vm, expr)||expr);
        node.removeAttribute(':' + type);
	}
}

export default CompileDirective;
