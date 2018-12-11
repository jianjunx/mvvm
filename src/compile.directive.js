import { nodeToArray, isEleNode, replaceMoustache, isDirective, setValue, getValue } from './utils/compile.utils';

class CompileDirective{
    constructor(){}
    text(node, expr){
        console.log(this.vm, expr);
        node.textContent = getValue(this.vm, expr);
    }
    html(node, expr){
        node.innerHTML = getValue(this.vm, expr);
    }
    model(node, expr){
        node.value = getValue(this.vm, expr)
        node.addEventListener('input', event => {
            const val = event.target.value;
            setValue(this.vm, expr, val);
        })
    }
}

export default CompileDirective;