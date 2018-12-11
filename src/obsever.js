import Dep from './dep';

class Obsever {
	constructor(data) {
		this.data = data;
		// 执行walk为对象的每个属性添加get\set
		this.walk(data);
	}
	walk(data) {
		// 判断data是否为对象，是对象的话再劫持
		if (data && typeof data == 'object') {
			for (const key in data) {
				// 调用defineRactive添加get set
				this.defineRactive(data, key, data[key]);
				// 递归处理
				this.walk(data[key]);
			}
		}
	}
	defineRactive(obj, key, value) {
		const self = this;
		// 初始化一个Dep实例
		const dep = new Dep();
		Object.defineProperty(obj, key, {
			configurable: true,
			enumerable: true,
			get() {
				/**
				 * 当创建new Watcher实例的时候Watcher中会执行入下代码
				 * 把Watcher实例的 this 赋值给Dep.target
				 * Dep.target = this;
				 * 这里再去获取劫持的属性值，就会进入当前这个get函数内，这时下方的Dep.target 就等于html方法里的那个new Watcher实例
				 * html(node, expr) {
						node.innerHTML = getValue(this.vm, expr);
						new Watcher(this.vm, expr, value => {
							node.innerHTML = value;
						});
					}
				 * getValue(this.vm, this.expr);
				 */
				Dep.target && dep.addSubs(Dep.target); // Dep.target 等于Watcher实例，这里就把Watcher实例添加到dep里的subs数组中
				/**
				 * 上面执行完这里再把Dep.target = null 一面无限制的网dep.subs 添加watcher
				 * Dep.target = null;
				 */
				return value;
			},
			set(newVal) {
				// debugger
				if (value === newVal) return;
				value = newVal;
				// 如果新值是对象这里继续调用walk劫持
				self.walk(value);
				// 值发生改变调用dep.notify方法 通知变化
				dep.notify();
			}
		});
	}
}

export default Obsever;
