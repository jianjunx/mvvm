// nodes转换为array
export const nodeToArray = nodes => {
	return Array.from(nodes);
};
// 是否是元素节点
export const isEleNode = node => {
	return node.nodeType === 1;
};
// 从vm中取值
export const getValue = (vm, expr) => {
	return expr.split('.').reduce((pv, cv) => {
		return pv[cv];
	}, vm);
};
// 递归替换
export const replaceMoustache = (text, reg, vm, fn) => {
	const newText = text.replace(reg, (placeholder, expr) => {
		fn && fn(expr);
		return getValue(vm, expr);
	});
	if (!reg.test(newText)) return newText;
	replaceMoustache(newText, reg, vm, fn);
};

export const isDirective = dir => {
	return dir.startsWith('v-');
};

export const getDirective = dir => {
	return dir.slice(2);
};

export const setValue = (vm, expr, value) => {
	const keyList = expr.split('.'),
		popKey = keyList.pop();
	const data = keyList.reduce((item, key) => {
		return item[key];
	}, vm);
	data[popKey] = value;
};

