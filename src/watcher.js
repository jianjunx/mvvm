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
		// 初始化时将this(就是new Watcher的实例)临时赋给Dep.target
		Dep.target = this;
		// 这里获取下监控的值，这是会进入到observe里的get函数中 把Dep.target添加到dep实例中的subs里
		getValue(this.vm, this.expr);
		// 这里在清空 防止无限制的添加依赖
		Dep.target = null;
	}
	update() {
		// 当值发生改变在set函数中会执行dep实例的notify方法，在init步骤中我们已经把this添加到了dep实例的subs中
		// 这时dep.notify方法会循环执行sub.update() sub就是this update就是当前这个方法
		// 这里在执行fn 并把新值放到第一个参数中
		// fn实在new Watcher中传进来的
		this.fn(getValue(this.vm, this.expr));
	}
}

export default Watcher;
