class Dep {
	constructor() {
		this.subs = [];
	}
	addSubs(sub) {
		// 把watcher实例添加到subs
		this.subs.push(sub);
	}
	notify() {
		// 循环并执行watcher实例中的update方法 刷新页面
		this.subs.forEach(sub => sub.update());
	}
}

export default Dep;
