import { getValue } from './utils/compile.utils';
import Dep from './dep';

class Watcher {
	constructor(vm, expr, fn) {
		this.vm = vm;
		this.expr = expr;
		this.fn = fn;
		this.init();
	}
	init() {
		Dep.target = this;
		getValue(this.vm, this.expr);
		Dep.target = null;
	}
	update() {
		this.fn(getValue(this.vm, this.expr));
	}
}

export default Watcher;
