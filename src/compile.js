import { nodeToArray, isEleNode, replaceMoustache, isDirective, getDirective } from './utils/compile.utils';
import CompileDirective from './compile.directive';
import Watcher from './watcher';

// Compile 处理HTML上的指令和插值语法
class Compile extends CompileDirective {
	constructor(vm, el) {
		super();
		this.vm = vm;
		this.init(el);
	}
	init(el) {
		// 获取#app
		this.el = typeof el === 'string' ? document.querySelector(el) : el;
		// 替换后的子节点添加到el
		this.el.appendChild(this.nodeLikeFragment(this.el));
	}
	nodeLikeFragment(el) {
		const childes = nodeToArray(el.childNodes);
		// 在内存中创建dom
		const fragment = document.createDocumentFragment();
		for (const node of childes) {
			// 元素节点进行替换
			isEleNode(node) && this.replace(node);
			// 递归处理子节点
			if (node.childNodes && node.childNodes.length) {
				node.appendChild(this.nodeLikeFragment(node));
			}
			// 将node添加到fragment
			fragment.appendChild(node);
		}
		return fragment;
	}
	replace(node) {
		// 处理八字胡插值语法
		this.moustache(node);
		const attrs = nodeToArray(node.attributes); // node上的获取属性
		for (const attr of attrs) {
            const { nodeName, nodeValue } = attr; // 解构属性名和属性值
            // 判断如果是v-开头的就是需要的指令
			if (isDirective(nodeName)) {
				const dir = getDirective(nodeName); // v-text 去掉v- 返回 text
				this[dir] && this[dir](node, nodeValue); // 判断CompileDirective中的 对应方法存在就直接调用
				dir.includes('on:') && this.on(node, dir.split(':')[1], nodeValue); // 处理v-on
				dir.includes('bind:') && this.bind(node, dir.split(':')[1], nodeValue); // 处理v-bind
            }
            nodeName.startsWith('@') && this.on(node, nodeName.slice(1), nodeValue); // 如果是@开头的话直接调用 CompileDirective中的on方法
            nodeName.startsWith(':') && this.bind(node, nodeName.slice(1), nodeValue); // 如果是:开头的话直接调用 CompileDirective中的bind方法
		}
    }
    // 处理插值语法{{}}
	moustache(node) {
		const text = node.textContent;
		if (!text) return;
		const reg = /\{\{((?:.|\n)+?)\}\}/g;
		// 正则匹配到{{}} 去到里面的值进行替换
		node.textContent = replaceMoustache(text, reg, this.vm, expr => {
            // 创建Watcher实例 数据发生变化进行实时更新
			new Watcher(this.vm, expr, value => {
				node.textContent = replaceMoustache(text, reg, this.vm);
			});
		});
	}
}

export default Compile;
