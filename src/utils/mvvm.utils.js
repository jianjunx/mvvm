// 将数据代理到vm
export const dataAgent = (vm, data) => {
    for (const key in data) {
        Object.defineProperty(vm, key, {
            configurable: true,
            get(){
                return data[key];
            },
            set(val){
                data[key] = val;
            }
        })
    }
}