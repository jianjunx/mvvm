import { dataAgent } from './utils/mvvm.utils';
import Compile from './compile';

class Mvvm {
    constructor(option = {}){
        this.$option = option;
        this.$el = option.el;
        const data = this._data = option.data;
        // 数据代理到this上
        dataAgent(this, data);
        // Compile
        new Compile(this, this.$el);
    }
}

export default Mvvm;