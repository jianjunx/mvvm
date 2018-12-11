import Dep from './dep';

class Obsever {
	constructor(data) {
		this.data = data;
		this.walk(data);
	}
	walk(data) {
		if (data && typeof data == 'object') {
			for (const key in data) {
				this.defineRactive(data, key, data[key]);
				this.walk(data[key]);
			}
		}
	}
	defineRactive(obj, key, value) {
		const self = this;
		const dep = new Dep();
		Object.defineProperty(obj, key, {
			configurable: true,
			enumerable: true,
			get() {
                Dep.target && dep.addSubs(Dep.target);
				return value;
			},
			set(newVal) {
				// debugger
				if (value === newVal) return;
				value = newVal;
				self.walk(value);
				dep.notify();
			}
		});
	}
}

export default Obsever;
