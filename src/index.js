import { dataAgent, methodsAgent, computedAgent } from './utils/mvvm.utils';
import Compile from './compile';
import Observer from './obsever';

class Mvvm {
	constructor(option = {}) {
		this.$option = option;
		this.$el = option.el;
		const data = (this._data = option.data);
		// data代理到this上
		dataAgent(this, data || {});
		// methods代理到this上
		methodsAgent(this, this.$option.methods || {});
		// 计算属性
		computedAgent(this, this.$option.computed || {});
		// Observer
        new Observer(this._data);
        // created
        this.$option.created && this.$option.created.call(this);
		// Compile
        new Compile(this, this.$el);
        // mounted
        this.$option.mounted && this.$option.mounted.call(this);
	}
}

export default Mvvm;
