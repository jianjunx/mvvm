// 将数据代理到vm
export const dataAgent = (vm, data) => {
	for (const key in data) {
		Object.defineProperty(vm, key, {
			configurable: true,
			get() {
				return data[key];
			},
			set(val) {
				data[key] = val;
			}
		});
	}
};
// 把methods代理到this 例如 this.sayHi()
export const methodsAgent = (vm, mth) => {
	for (const key in mth) {
		Object.defineProperty(vm, key, {
			configurable: true,
			get() {
				// 把methods中的函数绑定到vm上并改变this
				return typeof mth[key] === 'function' && mth[key].bind(vm);
			},
			set() {}
		});
	}
};
// 把计算属性代理到this
export const computedAgent = (vm, cmp) => {
	for (const key in cmp) {
		Object.defineProperty(vm, key, {
			configurable: true,
			// 判断cmp[key]是函数的话get就直接等于计算属性内的函数，取值的话调用get等于直接调用计算属性里的函数
			// 如果是对象的话则调用对象的get
			get: typeof cmp[key] === 'function' ? cmp[key] : cmp[key].get,
			set() {}
		});
	}
};
