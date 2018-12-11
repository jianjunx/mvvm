import { nodeToArray, isEleNode, replaceMoustache, isDirective, getDirective } from './utils/compile.utils';
import CompileDirective from './compile.directive';

class Compile extends CompileDirective {
	constructor(vm, el) {
        super();
		this.vm = vm;
        this.init(el)
    }
    init(el){
        // 获取#app
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        // 替换后的子节点添加到el
        this.el.appendChild(this.nodeLikeFragment(this.el));
    }
    nodeLikeFragment(el){
        const childes = nodeToArray(el.childNodes);
        // 在内存中创建dom
        const fragment = document.createDocumentFragment();
        for (const node of childes) {
            // 元素节点进行替换
            isEleNode(node) && this.replace(node);
            // 递归处理子节点
            if(node.childNodes && node.childNodes.length){
                node.appendChild(this.nodeLikeFragment(node));
            }
            // 将node添加到fragment
            fragment.appendChild(node)
        }
        return fragment;
    }
    replace(node){
        // 处理八字胡插值语法
        this.moustache(node);
        // 解析指令
        const attrs = nodeToArray(node.attributes);
        for (const attr of attrs) {
            const { nodeName, nodeValue } = attr;
            if(isDirective(nodeName)){
                this[getDirective(nodeName)](node, nodeValue);
            }
        }
    }
    moustache(node){
        const text = node.textContent;
        if(!text) return;
        const reg = /\{\{((?:.|\n)+?)\}\}/g;
        node.textContent = replaceMoustache(text, reg, this.vm, expr => {
            console.log(expr);
        });
    }
}


export default Compile;