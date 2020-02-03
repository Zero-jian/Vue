class Vue {
    constructor(options) {
        this.options = options;
        let _data = this.data = options.data || {};
        this.initData();
        this.initComputed();
        new Observer(_data);
        this.initWatch();
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

    initComputed() {
        //实现Computed属性
        let com = this.options.computed;
        Object.keys(com).forEach(key => {
            Object.defineProperty(this, key, {
                get: com[key],
                set: () => {}
            })
        })
    }

    initWatch() {
        let watch = this.options.watch;
        Object.keys(watch).forEach(key => {
            new Watch(this, key, watch[key]);
        })
    }
}