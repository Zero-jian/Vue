class Vue {
    constructor(options) {
        this.options = options;
        let _data = this.data = options.data || {};
        this.initData();
        new Observer(_data);
        new Complie(options.el, this);
    }

    initData() {
        //把options.data里面的数据绑定在Vue实例上
        Object.keys(this.data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return this.data[key];
                },

                set(newVal) {
                    this.data[key] = newVal;
                }
            })
        })
    }
}