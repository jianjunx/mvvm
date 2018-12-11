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
// 递归替换匹配到的{{}}
export const replaceMoustache = (text, reg, vm, fn) => {
	const newText = text.replace(reg, (placeholder, expr) => {
		fn && fn(expr);
		return getValue(vm, expr);
	});
	if (!reg.test(newText)) return newText;
	replaceMoustache(newText, reg, vm, fn);
};
// 判断是不是v-开头
export const isDirective = dir => {
	return dir.startsWith('v-');
};
// 截取v-开头的指令名
export const getDirective = dir => {
	return dir.slice(2);
};
// v-modal中设置val，把最后一个key去除，循环拿到最后一个值的上级对象再进行赋值
export const setValue = (vm, expr, value) => {
	const keyList = expr.split('.'),
		popKey = keyList.pop();
	const data = keyList.reduce((item, key) => {
		return item[key];
	}, vm);
	data[popKey] = value;
};

